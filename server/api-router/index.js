/**
 * Import dependencies
 */
const express = require('express');
const bearerToken = require('express-bearer-token');
const jwt = require('jsonwebtoken');
const constants = require('../../src/constants');
const taskRouter = require('./task');
const userRouter = require('./user');

// Create API router
const router = express.Router();

/**
 * Parse token middleware
 */
router.use(bearerToken());

/**
 * Token validation middleware
 */
router.use((req, res, next) => {
  if (req.token) {
    jwt.verify(req.token, constants.passwordSecret, (err, decoded) => {
      if (err) {
        res.status(400).json({ errors: { default: 'Invalid token' } });
      } else {
        req.decodedToken = decoded;
        next();
      }
    });
  } else {
    res.status(401).json({ errors: { default: 'No token provided' } });
  }
});

// include task API
router.use('/task', taskRouter);
// include user API
router.use('/user', userRouter);

/**
 * Export
 */
module.exports = router;
