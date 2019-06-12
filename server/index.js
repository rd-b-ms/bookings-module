const newrelic = require('newrelic');
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const db = require('../db/mongoDB');

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
      res.send(JSON.stringify(result[0]));
      res.status(500);
      res.end();
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

  // console.log(JSON.stringify(nextBooking));

  db.addDocuments((error, result) => {
    if (error) {
      res.status(500);
      throw error;
    } else {
    // console.log(`Sending POST response: ${JSON.stringify(result.value.bookings[result.value.bookings.length - 1].fromDate)}`);
    // console.log(`Result: ${JSON.stringify(result)}`);

      res.send(JSON.stringify(result.value));
      res.status(500);
      res.end();
    }
  }, listingid, nextBooking);
});

app.listen(port, () => console.log(`Booking's module server listening on port ${port}!`));
