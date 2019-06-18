/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
const { MongoClient } = require('mongodb');
const redis = require('redis');

const redisClient = redis.createClient();

redisClient.on('connect', () => {
  console.log('Redis on!');
});

redisClient.on('error', (err) => {
  console.log(`Something went wrong ${err}`);
});

let bookingsPortals;
let listingBookings;
let globalClient;

const developmentURI = 'mongodb://myTester4:xyz123@54.237.131.228:27017/bookings_portals';
const localURI = 'mongodb://localhost@127.0.0.1:27017/bookings_portals';

const connection = MongoClient.connect(localURI, { poolSize: 10 }, (err, client) => {
  globalClient = client;
  bookingsPortals = client.db('bookings_portals');
  listingBookings = bookingsPortals.collection('listingBookings');
});

const findDocuments = function (callback, listingid) {
  redisClient.get(listingid, (err, reply) => {
    if (err) {
      callback(err, null);
    } else if (reply) {
      console.log(`Reply: ${reply}`);
      callback(null, JSON.parse(reply));
    } else {
      listingBookings.find({ listing_id: Number(listingid) }).toArray((err, docs) => {
        if (err) {
          callback(err, null);
        } else {
          redisClient.set(listingid, JSON.stringify(docs), () => {
            callback(null, docs);
          });
        }
      });
    }
  });
};

const insertDocuments = function (callback, listingid, newBooking) {
  const session = globalClient.startSession();
  session.startTransaction();

  try {
    listingBookings.find({ listing_id: Number(listingid) }).toArray((err, docs) => {
      if (err) {
        callback(err, null);
      } else {
        newBooking.booking_id = docs[0].bookings.length + 1;
        const allBookings = docs[0].bookings;
        allBookings.push(newBooking);
        listingBookings.findOneAndUpdate({ listing_id: Number(listingid) }, { $set: { bookings: allBookings } }, { returnNewDocument: true }, (error, result) => {
          if (error) {
            callback(error, null);
          } else {
            console.log(`listingid: ${JSON.stringify(listingid)}`);
            console.log(`Result.value: ${JSON.stringify(result.value)}`);
            // redisClient.set(listingid.toString(), JSON.stringify(result.value), (err) => {
            if (err) {
              callback(err, null);
            } else {
              callback(null, result);
            }
            // });
          }
        });
      }
    });
  } catch (error) {
    session.abortTransaction();
    callback(error, null);
  }

  session.commitTransaction();
  session.endSession();
};

module.exports = {
  findDocuments,
  insertDocuments,
};


// module.exports.findBookByTitleCached = function (db, redis, title, callback) {
//   redis.get(title, function (err, reply) {
//       if (err) callback(null);
//       else if (reply) //Book exists in cache
//       callback(JSON.parse(reply));
//       else {
//           //Book doesn't exist in cache - we need to query the main database
//           db.collection('text').findOne({
//               title: title
//           }, function (err, doc) {
//               if (err || !doc) callback(null);
//               else {\\Book found in database, save to cache and
//                   return to client
//                   redis.set(title, JSON.stringify(doc), function () {
//                       callback(doc);
//                   });
//               }
//           });
//       }
//   });
// };
