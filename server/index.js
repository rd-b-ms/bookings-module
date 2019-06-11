/* eslint-disable no-console */
require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
// const db = require('../db/sequelize');
const db = require('../db/mongoDB');

const url = 'mongodb://localhost:27017/bookings_portals';

const port = process.env.PORT || 3003;

const app = express();

app.use(express.static('./client/dist/listing'));
app.use('/error', express.static('./client/dist/error'));
app.use(bodyParser.json());

app.get('/booking', (req, res) => {
  const { listingid } = req.query;

  db.getDocuments((error, result) => {
    if (error) {
      throw error;
    } else {
      // console.log('RESULT,', result[0]);
      // const stringified = JSON.stringify(result);
      res.send(JSON.stringify(result[0]));
      // res.json(result);
    }
  }, listingid);
});

app.post('/booking/availabilities', (req, res) => {
  const { listingId } = req.query;
  const {
    fromDate,
    toDate,
    numGuests,
    numInfants,
  } = req.body;
  db.Availability.create({
    listing_id: listingId,
    from_date: fromDate,
    to_date: toDate,
    num_guests: numGuests,
    num_infants: numInfants,
  })
    .then(newBooking => (
      res.json(newBooking)
    ))
    .catch(() => (
      res.sendStatus(500)
    ));
});

app.post('/booking/listings', (req, res) => {
  const { listingId } = req.query;
  const {
    price,
    numReviews,
    avgRatingPct,
    serviceFeePct,
    minNights,
    maxGuests,
  } = req.body;
  db.Listing.create({
    listing_id: listingId,
    price,
    num_reviews: numReviews,
    avg_rating_pct: avgRatingPct,
    service_fee_pct: serviceFeePct,
    min_nights: minNights,
    max_guests: maxGuests,
  })
    .then(newBooking => (
      res.json(newBooking)
    ))
    .catch(() => (
      res.sendStatus(500)
    ));
});

app.delete('/booking/availabilities/:id', (req, res) => {
  // req.body = { listingId };
  // const {
  //   listingId,
  // } = req.body;
  const listingId = req.params.id;
  console.log(listingId);
  db.Availability.destroy({
    where: {
      listing_id: listingId,
    },
  })
    .then(() => (
      res.send('Successfully deleted availability!')
    ))
    .catch(() => (
      res.sendStatus(500)
    ));
});

app.delete('/booking/listings/:id', (req, res) => {
  // const {
  //   listingId,
  // } = req.body;
  const listingId = req.params.id;
  db.Listing.destroy({
    where: {
      listing_id: listingId,
    },
  })
    .then(() => (
      res.end('Successfully deleted listing!')
    ))
    .catch(() => (
      res.sendStatus(500)
    ));
});

app.put('/booking/availabilities/:id', (req, res) => {
  const {
    numGuests,
  } = req.body;
  const listingId = req.params.id;
  db.Availability.update(
    { num_guests: numGuests },
    { returning: true, where: { listing_id: listingId } },
  )
    .then(reply => (
      res.json(reply).end('Success!')
    ))
    .catch(() => (
      res.sendStatus(500)
    ));
});

app.put('/booking/listings/:id', (req, res) => {
  const {
    maxGuests,
  } = req.body;
  const listingId = req.params.id;
  db.Listing.update(
    { max_guests: maxGuests },
    { returning: true, where: { listing_id: listingId } },
  )
    .then(reply => (
      res.json(reply).end('Success!')
    ))
    .catch(() => (
      res.sendStatus(500)
    ));
});

app.listen(port, () => console.log(`Booking's module server listening on port ${port}!`));
