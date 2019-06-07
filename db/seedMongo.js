const url = 'mongodb://localhost:27017/';
const { MongoClient } = require('mongodb');
const seededData = require('./generateNonRelationalData');

MongoClient.connect(url, (err, db) => {
  const listingRecords = seededData.generateListings();
  const dbo = db.db('bookings_portals');

  if (err) {
    throw err;
  }

  dbo.collection('bookings_portals').insertMany(listingRecords, (err, res) => {
    if (err) {
      throw err;
    }
    console.log(`${res.insertedCount} documents inserted`);
    db.close();
  });
});
