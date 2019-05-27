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

app.post('/booking', (req, res) => {
  const { listingId, fromDate, toDate } = req.body;
  db.Availability.create({ listing_id: listingId, from_date: fromDate, to_date: toDate })
    .then(newBooking => (
      res.json(newBooking)
    ))
    .catch(() => (
      res.sendStatus(500)
    ));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
