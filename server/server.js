const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

const kipsu = require('./sites/kipsu.js');
const lever = require('./sites/lever.co.js');
const greenhouse = require('./sites/greenhouse.js');
const applytojob = require('./sites/applytojob.js');

const jobArray = [];

// Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('build'));

// Call
app.get('/get', async (req, res) => {
  await allJobs().then((response) => {
    res.send(jobArray.flat())
  });
});

// Listen
app.listen(PORT, () => {
  console.log('Listening on port: ', PORT);
});

const allJobs = async () => {  
  await kipsu()
    .then((results) => {
      // console.log('Kipsu: ', results);
      jobArray.push(results);
    });
      
  await lever()
    .then((results) => {
      // console.log('Lever: ', results);
      jobArray.push(results);
    });

  await greenhouse()
    .then((results) => {
      // console.log('Greenhouse: ', results);
      jobArray.push(results);
    });

    await applytojob()
    .then((results) => {
      // console.log('Apply To Job: ', results);
      jobArray.push(results);
    });
};