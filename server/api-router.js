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

router.post('/user/login',(req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  console.log(req.body);
  User.findOne({ email }).exec().then((response) => {
    console.log(response);
    if (!response) {
      res.status(404).json({ email: 'Email is not registered'});
    }
    let passwordDigest = null;
    bcrypt.hash(password, 10, (err, hash) => {
      passwordDigest = hash;
    });
    if (response.password_digest === passwordDigest ) {
      res.json({ email: response.email, name: response.name });
    } else {
      res.status(400).json({ password: 'Password is not valid' });
    }
  })
});

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