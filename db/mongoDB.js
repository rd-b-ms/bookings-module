/* eslint-disable func-names */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017/bookings_portals';

// Database Name
const dbName = 'bookings_portals';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

const findDocuments = function (callback, db, listingid) {
  const collection = db.collection('listingBookings');

  collection.find({ listing_id: Number(listingid) }).toArray((err, docs) => {
    // console.log('Found:');
    // console.log(docs);
    callback(null, docs);
  });
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

module.exports = {
  getDocuments,
  findDocuments,
};
