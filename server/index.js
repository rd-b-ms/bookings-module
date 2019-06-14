require('newrelic');
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-console */
// eslint-disable-next-line import/order
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../db/mongoDB');
// const CORS = require('cors');

const port = process.env.PORT || 3003;
const app = express();

// app.use(CORS());
app.use(express.static(path.join(__dirname, '../client/dist/listing')));
app.use('/error', express.static('./client/dist/error'));
app.use(bodyParser.json());

app.get('/booking', (req, res) => {
  const { listingid } = req.query;

  db.findDocuments((error, result) => {
    if (error) {
      res.status(500).send();
    } else {
      res.status(200).send(JSON.stringify(result[0]));
    }
  }, listingid);
});

app.post('/booking', (req, res) => {
  const listingid = req.body.listingId;

  const nextBooking = {
    fromDate: req.body.fromDate,
    toDate: req.body.toDate,
    numGuests: req.body.numGuests,
    numInfants: req.body.numInfants,
  };

  db.insertDocuments((error, result) => {
    if (error) {
      res.status(500);
    } else {
      res.status(200).send(JSON.stringify(result.value));
    }
  }, listingid, nextBooking);
});

app.listen(port, () => console.log(`Booking's module server listening on port ${port}!`));
