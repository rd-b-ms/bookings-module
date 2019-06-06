/* eslint-disable indent */
/* eslint-disable func-names */
/* eslint-disable no-console */
const pgp = require('pg-promise')(/* options */);
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();

// CHANGE THE NAME OF THE DATABASE YOU'RE SEEDING SO THAT YOU DON'T
// OVERWRITE YOUR CURRENTLY SEEDED DATABASE

const connection = 'postgres://martinconnor:yourpassword@localhost:5432/booking_portal';
const db = pgp(connection);
const seededData = require('./generateData');

const insertListingRecords = function () {
  const listingRecords = seededData.generateListings();

  const dataGen = () => {
    writer.pipe(fs.createWriteStream('listings_data.csv'));
    for (let i = 0; i < 100; i += 1) {
      writer.write(listingRecords[i]);
      if (i % 10000 === 0) {
        console.log(`Finished # ${i}`);
      }
    }
    writer.end();
    console.log('Done Listings!');
  };

  dataGen();
};

const insertBookingRecords = function () {
  const bookingRecords = seededData.generateListBookings();

  for (let i = 0; i < 500000; i += 1) {
    const value = bookingRecords[i];
    const query = pgp.helpers.insert(value, null, 'bookings');

    db.none(query);
    //   .then(() => {
    //     console.log('Successful listings insert!');
    //   })
    //   .catch((error) => {
    //     console.log(`Bookings error: ${error}`);
    //   });
  }
};

insertListingRecords();
insertBookingRecords();
