const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(
  express.json({
    type: ['application/json', 'text/plain']
  })
);
// app.use(bodyParser.urlencoded({ extended: true }));
app.use('/subtitles', require('./app/routes/subtitles.controller.js'));

const port = 8000;
app.listen(port, () => {
  console.log('We are live on ' + port);
});
