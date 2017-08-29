const express = require('express');
const bodyParser = require('body-parser');
const co = require('co');
const MongoClient = require('mongodb').MongoClient;
const app = express();

app.use(express.static('build'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/users', (req, res) => {
  let users = co(function*() {
    const db = yield MongoClient.connect("mongodb://localhost:270172/test");

    let res = yield db.collection('users');

    db.close();

    return res;
  }).catch(err => console.log(err));

  res.send(users);
});

app.listen(8080);