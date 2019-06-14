/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
const { MongoClient } = require('mongodb');

let bookingsPortals;
let listingBookings;

const connection = MongoClient.connect('mongodb://localhost:27017/bookings_portals', { poolSize: 10 }, (err, client) => {
  bookingsPortals = client.db('bookings_portals');
  listingBookings = bookingsPortals.collection('listingBookings');
});

const findDocuments = function (callback, listingid) {
  listingBookings.find({ listing_id: Number(listingid) }).toArray((err, docs) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, docs);
    }
  });
};

const insertDocuments = function (callback, listingid, newBooking) {
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
          callback(null, result);
        }
      });
    }
  });
};

module.exports = {
  findDocuments,
  insertDocuments,
};
