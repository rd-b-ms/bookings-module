const faker = require('faker');
const db = require('./sequelize');

const listingData = [];
const availabilityData = [];

function formatDate(date) {
  const mm = date.getMonth() + 1;
  const dd = date.getDate();

  return [date.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd,
  ].join('-');
}

for (let i = 0; i < 101; i += 1) {
  const listing = {
    price: faker.random.number({ min: 30, max: 1000 }),
    num_reviews: faker.random.number({ min: 0, max: 300 }),
    avg_rating_pct: faker.random.number({ min: 0, max: 100 }),
    service_fee_pct: faker.random.number({ min: 105, max: 110 }),
    min_nights: faker.random.number({ min: 2, max: 30 }),
    max_guests: faker.random.number({ min: 2, max: 10 }),
  };
  listingData.push(listing);
}

for (let j = 0; j < 5; j += 1) {
  const fromDate = faker.date.between('2019-06-01', '2019-12-29');
  const fromDateTemp = new Date(fromDate.toDateString());
  fromDateTemp.setDate(fromDateTemp.getDate() + 1);
  const toDate = faker.date.between(formatDate(fromDateTemp), '2019-12-31');
  const booking = {
    listing_id: faker.random.number({ min: 1, max: 101 }),
    from_date: fromDate,
    to_date: toDate,
    num_guests: faker.random.number({ min: 1, max: 10 }),
    num_infants: faker.random.number({ min: 0, max: 5 }),
  };
  availabilityData.push(booking);
}

db.sequelize.sync({ force: true })
  .then(() => {
    db.Listing.bulkCreate(listingData);
  })
  .then(() => {
    db.Availability.bulkCreate(availabilityData);
  })
  .catch((err) => {
    throw err;
  });
