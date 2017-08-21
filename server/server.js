const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();

app.use(express.static('build'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/build/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/src/index.js', (req,res) => {
  console.log(req.body);
});

app.listen(8080);