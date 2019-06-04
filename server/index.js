const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/sequelize');

const port = process.env.PORT || 3003;

const app = express();

app.use(express.static('./client/dist/listing'));
app.use('/error', express.static('./client/dist/error'));
app.use(bodyParser.json());

app.get('/booking', (req, res) => {
  const { listingid } = req.query;
  Promise.all([db.Listing.findOne({ where: { listing_id: listingid } }),
    db.Availability.findAll({ where: { listing_id: listingid } })])
    .then(result => (
      res.json(result)
    ))
    .catch(() => (
      res.sendStatus(500)
    ));
});

app.post('/booking/availabilities', (req, res) => {
  const {
    listingId,
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
  const {
    listingId,
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

app.delete('/booking', (req, res) => {
  const {
    listingId,
  } = req.body;
  console.log(req.body);
  db.Listing.destroy({
    where: {
      listing_id: listingId,
    },
  })
    .then(reply => (
      res.json(reply)
    ))
    .catch(() => (
      res.sendStatus(500)
    ));
});

app.delete('/booking/listings', (req, res) => {
  const {
    listingId,
  } = req.body;
  db.Listing.destroy({
    where: {
      listing_id: listingId,
    },
  })
    .then(reply => (
      res.json(reply)
    ))
    .catch(() => (
      res.sendStatus(500)
    ));
});

app.delete('/booking/availabilities', (req, res) => {
  const {
    listingId,
  } = req.body;
  db.Availability.destroy({
    where: {
      listing_id: listingId,
    },
  })
    .then(reply => (
      res.json(reply)
    ))
    .catch(() => (
      res.sendStatus(500)
    ));
});

app.put('/booking/availabilities', (req, res) => {
  const {
    listingId,
    numGuests,
  } = req.body;
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

app.put('/booking/listings', (req, res) => {
  const {
    listingId,
    maxGuests,
  } = req.body;
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
