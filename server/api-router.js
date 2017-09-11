const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const User = require('./models/User');
const Task = require('./models/Task');

mongoose.connect('mongodb://localhost:27017/test');

router.use(bodyParser.urlencoded({extended: true}));

router.get('/user', (req, res) => {
  User.find({}).exec().then((response) => {
    res.json(response);
  });
});

router.get('/user/:id', (req, res) => {
  User.findById(req.param('id')).exec().then((response) => {
    res.json(response);
  });
});

router.post('/user/create', (req, res) => {
  User.create(req.body).then((response) => {
    res.json(response);
  });
});

module.exports = router;