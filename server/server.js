const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const axios = require('axios');
const kipsu = require('./sites/kipsu.js')
const crawlee = require('crawlee');
const gravie = require('./sites/gravie.js')

// const jobListing = [];
// Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('build'));

// Call
app.get('/get', (req, res) => {
  kipsu().then((response) => {
    console.log('Response: ', response)
    res.send(response)
  })
})

// Listen
app.listen(PORT, () => {
  console.log('Listening on port: ', PORT);
});