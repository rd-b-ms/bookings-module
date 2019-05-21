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
  db.Listing.findOne({ where: { listing_id: listingid } })
    .then(result => (
      res.json(result)
    ))
    .catch(() => {
      res.sendStatus(500);
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
