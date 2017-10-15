/**
 * Import dependencies
 */
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const SmtpServer = require('smtp-server').SMTPServer;
const db = require('./db');
const validations = require('../src/shared/validations');

// Create authentication router
const router = express.Router();

// Create SMTP server
const smtp = new SmtpServer({
  onAuth(auth, session, callback) {
    console.log(auth, session);
    if (auth.username !== 'admin' || auth.password !== 'adminadmin') {
      return callback(new Error('Invalid username or password'));
    }
    return callback(null, { user: 'admin' });
  },
});
smtp.listen(25);

// Parse request body stream as json
router.use(bodyParser.json());

/**
 * Handle login
 */
router.post('/login', (req, res) => {
  // Extract email and password from body
  const { email, password } = req.body.formData;

  // If variables are empty, there was no input submitted
  if (!email) {
    res.status(400).json({ error: { email: 'Please enter a valid Email address.' } });
  } else if (!password) {
    res.status(400).json({ error: { password: 'Please enter a valid Password' } });
  }
  // Fetch user from database using email
  db.getUserByEmail(email).then((response) => {
    // If response is empty, no user was found
    if (!response) {
      res.status(404).json({ error: { email: 'Email is not registered' } });
    }
    // Check submitted password with saved hash
    bcrypt.compare(password, response.password_digest, (err, isValid) => {
      if (isValid) {
        // TODO: Refactor secret into seperate config file
        const token = jwt.sign({
          email: response.email,
          id: response._id,
          name: response.name,
          role: response.role,
          username: response.username,
        }, 'secretsecretsecretsecret');
        res.json({ token });
      } else {
        res.status(400).json({ error: { password: 'Password is not valid' } });
      }
    });
  });
});

/**
 * Handle signup
 */
router.post('/signup', (req, res) => {
  // Validate input
  const { errors, isValid } = validations.validateSignupInput(req.body);

  if (isValid) {
    // Extract email, password and username from request body
    const { email, password, username } = req.body;
    // Fetch users with email from database
    const emailPromise = db.getUsersByEmail(email);
    // Fetch users with username from database
    const usernamePromise = db.getUsersByUsername(username.toLowerCase());

    // Wait for database requests to finish 
    Promise.all([emailPromise, usernamePromise]).then((responses) => {
      // Check if email and username are already in use
      if (responses[0].length > 0) {
        errors.email = 'Email is already in use';
      }
      if (responses[1].length > 0) {
        errors.username = 'Username is already in use';
      }
      if (responses[0].length > 0 || responses[1].length > 0) {
        res.status(400).json(errors);
      } else {
        // Hash password
        bcrypt.hash(password, 10, (err, hash) => {
          // Create user
          db.createUser(email, hash, username.toLowerCase()).then((response) => {
            if (response != null) {
              res.json({ success: true });
            } else {
              res.json({ success: false });
            }
          });
        });
      }
    });
  } else {
    res.status(400).json(errors);
  }
});

function sendResetMail(email, res, id) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'homizemailservice@gmail.com',
      pass: 'aip_homize17',
    },
  });
  transporter.sendMail({
    from: 'password-reset@homize.com',
    to: email,
    subject: '[Homize] Password Reset',
    text: `Please visit the following link to reset your password: http://localhost:3000/password-recovery/${id}`,
    html: `Please visit the following link to reset your password: <a href="http://localhost:3000/password-recovery/${id}">http://localhost:3000/password-recovery/${id}</a>`,
  }, (error) => {
    if (error) {
      res.status(400).json({ error: 'error while sending Email' });
    } else {
      res.json({ success: true });
    }
  });
}

/**
 * Handle Password Reset
 */
router.post('/password-reset', (req, res) => {
  const { email } = req.body;
  db.getUserByEmail(email).then((user) => {
    if (user !== null) {
      db.getRecoveryByUser(user).then((recovery) => {
        if (recovery !== null) {
          sendResetMail(email, res, recovery._id);
        } else {
          db.createRecovery(user).then((newRecovery) => {
            if (newRecovery !== null) {
              sendResetMail(email, res, newRecovery._id);
            } else {
              res.status(500).json({ error: 'Email could not be sent' });
            }
          });
        }
      });
    } else {
      res.status(400).json({ error: 'Email is not registered' });
    }
  });
});

/*
 * Handle password recovery
 */
router.post('/password-recovery', (req, res) => {
  const { id, password, confirmPassword } = req.body;
  let isValid = new RegExp('^[a-f0-9]{24}$').test(id);
  if (password !== confirmPassword) {
    isValid = false;
  }
  if (isValid) {
    db.getRecoveryById(id).then((recovery) => {
      if (recovery !== null) {
        db.getUserById(recovery.user).then((user) => {
          if (user !== null) {
            // Hash password
            bcrypt.hash(password, 10, (err, hash) => {
              // Create user
              db.updateUserById({
                _id: user._id
              }, {
                password_digest: hash
              }).then((response) => {
                if (response !== null) {
                  db.deleteRecoveryById(id);
                  res.json({ success: true });
                } else {
                  res.status(400).json({ error: 'Unexpected error while recovering. Try again.' });
                }
              });
            });
          } else {
            db.deleteRecoveryById(id);
            res.status(410).json({ error: 'User has been removed' });
          }
        });
      } else {
        res.status(400).json({ error: 'Password reset was not requested.' });
      }
    });
  } else {
    res.status(400).json({ error: 'Invalid ID was provided.' });
  }
});

/**
 * Export
 */
module.exports = router;
