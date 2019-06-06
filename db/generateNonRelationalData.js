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

const generateListingBookings = function () {
  const listingBookings = [];
  const fromDate = faker.date.between('2019-06-01', '2019-12-29');
  const fromDateTemp = new Date(fromDate.toDateString());
  fromDateTemp.setDate(fromDateTemp.getDate() + 1);
  const toDate = faker.date.between(formatDate(fromDateTemp), '2019-12-31');

  for (let i = 1; i < 10000001; i += 1) {
    const listingBooking = {
      listingBooking_id: i,
      price: faker.random.number({ min: 30, max: 1000 }),
      num_reviews: faker.random.number({ min: 0, max: 300 }),
      avg_rating_pct: faker.random.number({ min: 0, max: 100 }),
      max_guests: faker.random.number({ min: 2, max: 10 }),
      from_date: fromDate,
      to_date: toDate,
      num_guests: faker.random.number({ min: 0, max: 100 }),
      num_infants: faker.random.number({ min: 2, max: 10 }),
    };
    listingBookings.push(listingBooking);
  }
  return listingBookings;
};

generateListingBookings();

module.exports = {
  generateListingBookings,
};
