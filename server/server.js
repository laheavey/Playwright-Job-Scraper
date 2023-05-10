const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const PORT = process.env.PORT || 5000;

app.use(express.static('server/public'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const trains = [
  { name: 'Thomas', color: 'Blue' },
  { name: 'Gordon', color: 'Blue' },
  { name: 'Henry', color: 'Green' },
  { name: 'James', color: 'Red' }
];

app.get('/', (req, res) => {
  res.sendStatus(200);
})

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}...`);
})