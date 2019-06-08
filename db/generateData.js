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
  const recordsNumber = 10000005;

  for (let i = 1; i < recordsNumber; i += 1) {
    const listing = {
      price: Math.round(Math.random() * 1000) + 30,
      num_reviews: Math.round(Math.random() * 300),
      avg_rating_pct: Math.round(Math.random() * 100),
      max_guests: Math.round(Math.random() * 10) + 2,
    };
    listings.push(listing);
  }
  return listings;
};

const generateBookings = function () {
  const bookings = [];
  const fromDates = [];
  const toDates = [];
  const recordsNumber = 10000005;

  for (let i = 0; i < 105; i += 1) {
    let fromDate = faker.date.between('2019-06-01', '2019-12-29');
    const fromDateTemp = new Date(fromDate.toDateString());
    fromDateTemp.setDate(fromDateTemp.getDate() + 1);
    let toDate = faker.date.between(formatDate(fromDateTemp), '2019-12-31');
    fromDate = fromDate.toISOString();
    toDate = toDate.toISOString();

    fromDates.push(fromDate);
    toDates.push(toDate);
  }

  for (let i = 0; i < recordsNumber; i += 1) {
    const randomIndex = Math.round(Math.random() * 35);
    const booking = {
      listing_id: Math.round(Math.random() * 9999999) + 1,
      from_date: fromDates[randomIndex],
      to_date: toDates[randomIndex],
      num_guests: Math.round(Math.random() * 10),
      num_infants: Math.round(Math.random() * 2),
    };
    bookings.push(booking);
  }
  return bookings;
};

module.exports = {
  generateListings,
  generateBookings,
};
