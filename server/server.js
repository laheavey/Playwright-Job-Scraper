const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const pool = require('./modules/pool')

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
    res.send(jobArray.flat());
  });
});

app.get('/db', (req, res) => {
  const sqlQuery = `
  SELECT * FROM "prime_jobs"
  ORDER BY "company" ASC;`;
  pool.query(sqlQuery)
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('Error in /get_db: ', error);
    res.sendStatus(500);
  })
})

app.post('/db', (req, res) => {
  console.log('Req.body: ', req.body)
  const sqlQuery = `
  INSERT INTO "prime_jobs"
  ("title", "company", "location", "url")
  VALUES ($1, $2, $3, $4);`;
  const sqlValues = [
    req.body.title,
    req.body.company,
    req.body.location,
    req.body.apply
  ];
  pool.query(sqlQuery, sqlValues)
  .then((results) => {
    res.sendStatus(201)
  })
  .catch((error) => {
    console.log('Error in /post_db: ', error);
    res.sendStatus(500)
  })
})

// Listen
app.listen(PORT, () => {
  console.log('Listening on port: ', PORT);
});

const allJobs = async () => {  
  // await kipsu()
  //   .then((results) => {
  //     // console.log('Kipsu: ', results);
  //     jobArray.push(results);
  //   });
      
  await lever()
    .then((results) => {
      // console.log('Lever: ', results);
      jobArray.push(results);
    });

  // await greenhouse()
  //   .then((results) => {
  //     // console.log('Greenhouse: ', results);
  //     jobArray.push(results);
  //   });

  //   await applytojob()
  //   .then((results) => {
  //     // console.log('Apply To Job: ', results);
  //     jobArray.push(results);
  //   });
};