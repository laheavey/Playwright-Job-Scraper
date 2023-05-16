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

/** ---------- MIDDLEWARE ---------- **/
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('build'));


/** ---------- ROUTES ---------- **/

// GET - Scrapes job sites
app.get('/get', async (req, res) => {
  await allJobs().then((response) => {
    res.send(jobArray.flat());
  });
});

// GET - Pulls jobs saved to database
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

// POST - Saves new scraped jobs to Database
app.post('/db', (req, res) => {
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

/** ---------- LISTEN ---------- **/
app.listen(PORT, () => {
  console.log('Listening on port: ', PORT);
});

const allJobs = async () => {  
  // probably something to refactor here
  await kipsu()
    .then((results) => {
      jobArray.push(results);
    });
      
  await lever()
    .then((results) => {
      jobArray.push(results);
    });

  await greenhouse()
    .then((results) => {
      jobArray.push(results);
    });

    await applytojob()
    .then((results) => {
      jobArray.push(results);
    });
};