const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static('./client/dist'));
app.use(bodyParser.json());



app.listen(port, () => console.log(`Example app listening on port ${port}!`));