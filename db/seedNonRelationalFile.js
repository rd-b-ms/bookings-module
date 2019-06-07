/* eslint-disable indent */
/* eslint-disable func-names */
/* eslint-disable no-console */
const fs = require('fs');

const seededData = require('./generateNonRelationalData');

const insertListingBookingRecords = function () {
  const listingBookingRecords = seededData.generateListingBookings();

  const dataGen = () => {
    const file = fs.createWriteStream('listingBookings_data.json');
    for (let i = 0; i < 100; i += 1) {
      file.write(listingBookingRecords[i]);
    }
    file.end();
    console.log('ListingBookings done!');
  };

  dataGen();
};

insertListingBookingRecords();
