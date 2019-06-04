const Sequelize = require('sequelize');

const sequelize = new Sequelize('booking_portal', 'root', '', {
  host: 'localhost', // 172.17.0.2
  dialect: 'mysql',
  password: 'yourpassword',
});

const Listing = sequelize.define('listing', {
  // attributes
  listing_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  price: Sequelize.INTEGER,
  num_reviews: Sequelize.INTEGER,
  avg_rating_pct: Sequelize.INTEGER,
  service_fee_pct: Sequelize.INTEGER,
  min_nights: Sequelize.INTEGER,
  max_guests: Sequelize.INTEGER,
});

const Availability = sequelize.define('availability', {
  // attributes
  listing_id: {
    type: Sequelize.INTEGER,
    references: {
      model: Listing,
      key: 'listing_id',
    },
  },
  from_date: Sequelize.DATE,
  to_date: Sequelize.DATE,
  num_guests: Sequelize.INTEGER,
  num_infants: Sequelize.INTEGER,
});

// CREATES A ONE TO MANY RELATIONSHIP;
// CREATED THE LISTINGLISTINGID COLUMN IN AVAILABILITY:
Listing.hasMany(Availability);

module.exports = { sequelize, Listing, Availability };
