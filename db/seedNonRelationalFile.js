/* eslint-disable indent */
/* eslint-disable func-names */
/* eslint-disable no-console */
const fs = require('fs');
const csvWriter = require('csv-write-stream');
const stringify = require('csv-stringify');

const writer1 = csvWriter();
const { MongoClient } = require('mongodb');
const seededData = require('./generateNonRelationalData');

const url = 'mongodb://localhost:27017/';

// TRYING TO DESIGNATE NESTED ARRAYS AT AN OBJECT PROPERTY AS ARRAYS:
// stringify([{
//   name: 'test',
//   object: { test: 1 },
// }], {
//   cast: {
//     object(value) {
//       return value;
//     },
//   },
// }, (err, output) => {
//   fs.writeFile('testUpload.csv', output, 'utf8', (err) => {
//     if (err) {
//       console.log('Error - file either not saved or corrupted file saved.');
//     } else {
//       console.log('testUpload.csv file saved!');
//     }
//   });
// });

// DIRECT INJECTION:
// MongoClient.connect(url, (err, db) => {
//   const listingBookingRecords = seededData.generateListingBookings();
//   const dbo = db.db('listing_bookings');

//   if (err) {
//     throw err;
//   }

//   dbo.collection('listing_bookings').insertMany(listingBookingRecords, (err, res) => {
//     if (err) {
//       throw err;
//     }
//     console.log(`${res.insertedCount} documents inserted`);
//     db.close();
//   });
// });

// CREATE A JSON FILE:
const insertListingBookingRecords = function () {
  const listingBookingRecords = seededData.generateListingBookings();

  const dataGen = () => {
    writer1.pipe(fs.createWriteStream('listingBookings_data.json'));
    for (let i = 0; i < 10000000; i += 1) {
      writer1.write(listingBookingRecords[i]);
    }
    writer1.end();
    console.log('ListingBookings done!');
  };

  dataGen();
};

insertListingBookingRecords();
