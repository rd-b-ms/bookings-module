/* eslint-disable object-shorthand */
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
  let bookingGroup = [];
  const fromDates = [];
  const toDates = [];
  const bookingGroups = [];

  for (let j = 1; j < 42; j += 1) {
    for (let k = 1; k < 11; k += 1) {
      let fromDate = faker.date.between('2019-06-01', '2019-12-29');
      const fromDateTemp = new Date(fromDate.toDateString());
      fromDateTemp.setDate(fromDateTemp.getDate() + 1);
      let toDate = faker.date.between(formatDate(fromDateTemp), '2019-12-31');

      fromDate = fromDate.toISOString();
      toDate = toDate.toISOString();
      fromDates.push(fromDate);
      toDates.push(toDate);

      const booking = {
        booking_id: k,
        from_date: fromDate,
        to_date: toDate,
        num_guests: Math.round(Math.random() * 10),
        num_infants: Math.round(Math.random() * 2),
      };
      bookingGroup.push(booking);
    }
    bookingGroup = [];
    bookingGroups.push(bookingGroup);
  }

  for (let i = 1; i < 10000005; i += 1) {
    const listingBooking = {
      listing_id: i,
      price: Math.round(Math.random() * 1000) + 30,
      num_reviews: Math.round(Math.random() * 300),
      avg_rating_pct: Math.round(Math.random() * 100),
      max_guests: Math.round(Math.random() * 10) + 2,
      bookings: JSON.stringify(bookingGroups[Math.round(Math.random() * 40) + 1]),
    };

    listingBookings.push(listingBooking);
  }

  return listingBookings;
};

module.exports = {
  generateListingBookings,
};
