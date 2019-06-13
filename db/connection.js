const { MongoClient } = require('mongodb');

// const client = new MongoClient(url, { poolSize: 200, useNewUrlParser: true });
let exportedDatabase;

const connection = MongoClient.connect('mongodb://localhost:27017/bookings_portals', (err, database) => {
  if (err) {
    throw err;
  } else {
    module.exports.exportedDatabase = database;
  }
});

module.exports = {
  exportedDatabase,
};
