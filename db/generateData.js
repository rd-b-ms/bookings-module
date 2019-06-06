/* eslint-disable func-names */
/* eslint-disable no-undef */
const faker = require('faker');

function formatDate(date) {
  const mm = date.getMonth() + 1;
  const dd = date.getDate();

  return [date.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd,
  ].join('-');
}

const generateListings = function () {
  const listings = [];

  for (let i = 1; i < 100; i += 1) {
    const listing = {
      price: faker.random.number({ min: 30, max: 1000 }),
      num_reviews: faker.random.number({ min: 0, max: 300 }),
      avg_rating_pct: faker.random.number({ min: 0, max: 100 }),
      max_guests: faker.random.number({ min: 2, max: 10 }),
    };
    listings.push(listing);
  }
  return listings;
};

const generateBookings = function () {
  const bookings = [];

  for (let i = 1; i < 100; i += 1) {
    const fromDate = faker.date.between('2019-06-01', '2019-12-29');
    const fromDateTemp = new Date(fromDate.toDateString());
    fromDateTemp.setDate(fromDateTemp.getDate() + 1);
    const toDate = faker.date.between(formatDate(fromDateTemp), '2019-12-31');
    const booking = {
      listing_id: faker.random.number({ min: 1, max: 9999999 }),
      from_date: fromDate,
      to_date: toDate,
      num_guests: faker.random.number({ min: 0, max: 100 }),
      num_infants: faker.random.number({ min: 2, max: 10 }),
    };
    bookings.push(booking);
  }
  return bookings;
};

const bookingRecords = generateBookings();
const listingRecords = generateListings();

module.exports = {
  generateListings,
  generateBookings,
  listingRecords,
  bookingRecords,
};
