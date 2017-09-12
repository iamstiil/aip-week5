const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('./models/User');
const Task = require('./models/Task');
const validateSignupInput = require('../src/shared/validations');

mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true });

router.use(bodyParser.json());

router.get('/user', (req, res) => {
  User.find({}).exec().then((response) => {
    res.json(response);
  });
});

router.post('/user', (req, res) => {
  const { errors, isValid } = validateSignupInput(req.body);

  if (isValid) {
    const { email, password, username } = req.body;
    const emailPromise = User.find({ email }).exec();
    const usernamePromise = User.find({ username }).exec();
    
    Promise.all([emailPromise, usernamePromise]).then((responses) => {
      if (responses[0].length > 0) {
        errors.email = 'Email is already in use';
      }
      if (responses[1].length > 0) {
        errors.username = 'Username is already in use';
      }
      if (responses[0].length > 0 || responses[1].length > 0) {
        res.status(400).json(errors);
      } else {
        bcrypt.hash(password, 10, function(err, hash) {
          User.create({
            email,
            name: '',
            password_digest: hash,
            username,
          }).then((response) => {
            res.json({ success: true });
          });
        });
      }
    });
  } else {
    res.status(400).json(errors);
  }
});

router.get('/user/:id', (req, res) => {
  User.findById(req.param('id')).exec().then((response) => {
    res.json(response);
  });
});

module.exports = router;