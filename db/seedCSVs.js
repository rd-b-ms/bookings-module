/* eslint-disable indent */
/* eslint-disable func-names */
/* eslint-disable no-console */
const fs = require('fs');

const seededData = require('./generateData');

const insertListingRecords = function () {
  const listingRecords = seededData.generateListings();

  const dataGen = () => {
    const listingsFile = fs.createWriteStream('listings_data.csv');
    for (let i = 0; i < 10000000; i += 1) {
      listingsFile.write(listingRecords[i]);
    }
    listingsFile.end();
    console.log('LISTINGS done!');
  };

  dataGen();
};

const insertBookingRecords = function () {
  const bookingRecords = seededData.generateBookings();

  const dataGen = () => {
    const bookingsFile = fs.createWriteStream('bookings_data.csv');
    for (let i = 0; i < 100000000; i += 1) {
      bookingsFile.write(bookingRecords[i]);
    }
    bookingsFile.end();
    console.log('BOOKINGS done!');
  };

  dataGen();
};

insertListingRecords();
insertBookingRecords();
