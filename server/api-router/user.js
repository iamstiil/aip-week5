const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');
const validateSignupInput = require('../../src/shared/validations');

const router = express.Router();

router.use(bodyParser.json());

router.post('/login',(req, res) => {
  const { email, password } = req.body.formData;
  if (!email || !password) {
    res.status(400).json({ error: { default: 'No input registered. Try again.' } })
  }

  db.getUserByEmail(email).then((response) => {
    if (!response) {
      res.status(404).json({ error: { email: 'Email is not registered' } });
    }
    bcrypt.compare(password, response.password_digest, (err, hash) => {
      if(res) {
        const token = jwt.sign({
          email: response.email,
          name: response.name,
        }, 'secretsecretsecretsecret');
        res.json({ token });
      } else {
        res.status(400).json({ error: { password: 'Password is not valid' }});
      }
    });
  })
});

router.get('/', (req, res) => {
  db.getUsers().then((response) => {
    let users = [];
    response.map((user) => {
      users.push({
        id: user._id,
        email: user.email,
        name: user.name,
      });
    });
    res.json(users);
  });
});

router.post('/', (req, res) => {
  const { errors, isValid } = validateSignupInput(req.body);

  if (isValid) {
    const { email, password, username } = req.body;
    const emailPromise = db.getUsersByEmail(email);
    const usernamePromise = db.getUsersByUsername(username.toLowerCase());
    
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
          db.createUser(email, hash, username.toLowerCase()).then((response) => {
            res.json({ success: true });
          });
        });
      }
    });
  } else {
    res.status(400).json(errors);
  }
});

router.get('/:id', (req, res) => {
  db.getUserById(req.param('id')).then((response) => {
    res.json(response);
  });
});

module.exports = router;
