/* eslint-disable indent */
/* eslint-disable func-names */
/* eslint-disable no-console */
const pgp = require('pg-promise')(/* options */);
const fs = require('fs');
const csvWriter = require('csv-write-stream');

const writer = csvWriter();

const connection = 'postgres://martinconnor:yourpassword@localhost:5432/booking_portal';
const db = pgp(connection);
const seededData = require('./generateData');

const insertListingRecords = function () {
  const listingRecords = seededData.generateListings();

  const dataGen = () => {
    writer.pipe(fs.createWriteStream('listings_data.csv'));
    for (let i = 0; i < 5000000; i += 1) {
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
  const bookingRecords = seededData.generateBookings();

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

// insertListingRecords();
insertBookingRecords();


// Increase memory:
// node --max-old-space-size=32768 listings_data.csv
// 16384

// Copy listings table:
// COPY listings(price,num_reviews,avg_rating_pct,max_guests) FROM '/Users/martinconnor/Desktop/booking-portal-module/db/listings_data.csv' DELIMITERS ',' CSV;

// Copy bookings table:
// COPY bookings(listing_id,from_date,to_date,num_guests,num_infants) FROM '/Users/martinconnor/Desktop/booking-portal-module/db/bookings_data.csv' DELIMITERS ',' CSV;

// Create 'listings' Table:
// CREATE TABLE listings (listing_id SERIAL PRIMARY KEY, price INT NOT NULL, num_reviews INT NOT NULL, avg_rating_pct INT NOT NULL, max_guests INT NOT NULL);

// Create 'bookings' Table:
// CREATE TABLE bookings (booking_id SERIAL PRIMARY KEY, listing_id INTEGER REFERENCES listings(listing_id), from_date TIMESTAMP NOT NULL, to_date TIMESTAMP NOT NULL, num_guests INT NOT NULL, num_infants INT NOT NULL);
