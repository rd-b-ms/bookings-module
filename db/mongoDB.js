/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017/bookings_portals';
// ?maxPoolSize=3000
const dbName = 'bookings_portals';
const client = new MongoClient(url, { poolSize: 200, useNewUrlParser: true });
const connexion = require('./connection');

const findDocuments = function (callback, db, listingid) {
  // const session = client.startSession();
  const collection = db.collection('listingBookings');

  const session2 = client.withSession(() => {
    // console.log('WITH SESSION!');
    collection.find({ listing_id: Number(listingid) }).toArray((err, docs) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, docs);
      }
    });
  });

  // session.startTransaction();
  // try {
  //   collection.find({ listing_id: Number(listingid) }).toArray((err, docs) => {
  //     if (err) {
  //       callback(err, null);
  //     } else {
  //       callback(null, docs);
  //     }
  //   });
  // } catch (error) {
  //   session.abortTransaction();
  //   callback(error, null);
  // }

  // session.commitTransaction();
  // session.endSession();
};

const getDocuments = function (callback, listingid) {
  client.connect((error) => {
    if (error) {
      callback(error, null);
    } else {
      const database = client.db(dbName);
      findDocuments(callback, database, listingid);
    }
  });
};

const insertDocuments = function (callback, db, listingid, newBooking) {
  const session = client.startSession();
  session.startTransaction();
  const collection = db.collection('listingBookings');

  try {
    collection.find({ listing_id: Number(listingid) }).toArray((err, docs) => {
      newBooking.booking_id = docs[0].bookings.length + 1;
      const allBookings = docs[0].bookings;
      allBookings.push(newBooking);

      collection.findOneAndUpdate({ listing_id: Number(listingid) }, { $set: { bookings: allBookings } }, { returnNewDocument: true }, (error, result) => {
        callback(null, result);
      });
    });
  } catch (error) {
    session.abortTransaction();
    callback(error, null);
  }

  session.commitTransaction();
  session.endSession();
};

const addDocuments = function (callback, listingid, newBooking) {
  client.connect((error) => {
    if (error) {
      callback(error, null);
    } else {
      const database = client.db(dbName);
      insertDocuments(callback, database, listingid, newBooking);
    }
  });
};

module.exports = {
  getDocuments,
  findDocuments,
  addDocuments,
  insertDocuments,
};
