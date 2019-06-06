
const url = 'mongodb://localhost:27017/';
const { MongoClient } = require('mongodb');
const seededData = require('./generateNonRelationalData2');

// CHANGE THE NAME OF THE DATABASE YOU'RE SEEDING SO THAT YOU DON'T
// OVERWRITE YOUR CURRENTLY SEEDED DATABASE

MongoClient.connect(url, (err, db) => {
  const listingRecords = seededData.generateListings();
  const dbo = db.db('bookings_portal');

  if (err) {
    throw err;
  }

  dbo.collection('bookings_portal').insertMany(listingRecords, (err, res) => {
    if (err) {
      throw err;
    }
    console.log(`${res.insertedCount} documents inserted`);
    db.close();
  });
});
