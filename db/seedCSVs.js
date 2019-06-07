/* eslint-disable indent */
/* eslint-disable func-names */
/* eslint-disable no-console */
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const writer1 = csvWriter();
const writer2 = csvWriter();
const seededData = require('./generateData');

const insertListingRecords = function () {
  const listingRecords = seededData.generateListings();

  const dataGen = () => {
    writer1.pipe(fs.createWriteStream('listings_data.csv'));
    for (let i = 0; i < 10000000; i += 1) {
      writer1.write(listingRecords[i]);
    }
    writer1.end();
    console.log('LISTINGS done!');
  };

  dataGen();
};

const insertBookingRecords = function () {
  const bookingRecords = seededData.generateBookings();

  const dataGen = () => {
    writer2.pipe(fs.createWriteStream('bookings_data5.csv'));
    for (let i = 0; i < 100000000; i += 1) {
      writer2.write(bookingRecords[i]);
    }
    writer2.end();
    console.log('BOOKINGS done!');
  };

  dataGen();
};

insertListingRecords();
insertBookingRecords();
