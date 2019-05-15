const db = require('./sequelize');
const faker = require('faker');

let listingData = [];
let availabilityData = [];

for (let i = 0; i < 101; i++) {
  let listing = {
    price: faker.random.number({min:30, max:1000}),
    num_reviews: faker.random.number({min:0, max:300}),
    avg_rating: faker.random.number({min:0, max:50}),
    service_fee_pct: faker.random.number({min:105, max:110}),
    min_nights: faker.random.number({min:2, max:30}),
    max_guests: faker.random.number({min:2, max:10})
  };
  listingData.push(listing);
}

console.log(listingData);



db.Listing.bulkCreate();