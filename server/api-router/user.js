/**
 * Import dependencies
 */
const bodyParser = require('body-parser');
const express = require('express');
const db = require('../db');

// Initialize user router
const router = express.Router();

// Parse request body stream as json
router.use(bodyParser.json());

/**
 * Get list of all users
 */
router.get('/', (req, res) => {
  // Fetch user list from database
  db.getUsers().then((response) => {
    const users = [];
    // Extract specific fields from response
    response.map((user) => {
      users.push({
        id: user._id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        role: user.role,
        username: user.username,
      });
      return user;
    });
    res.json(users);
  });
});

/**
 * Get user
 */
router.get('/:id', (req, res) => {
  // Fetch user with id from database
  db.getUserById(req.param('id')).then((response) => {
    res.json(response);
  });
});

/**
 * Update user
 */
router.put('/:id', (req, res) => {
  // Fetch user with id from database
  db.updateUserById({ _id: req.params.id }, req.body).then((response) => {
    res.json({
      email: response.email,
      id: response._id,
      name: response.name,
      phone: response.phone,
      role: response.role,
      username: response.username,
    });
  });
});

/**
 * Delete user
 */
router.delete('/:id', (req, res) => {
  if (req.params.id === req.body.id) {
    db.deleteUserById({ _id: req.params.id }).then((response) => {
      res.json({
        email: response.email,
        id: response._id,
        name: response.name,
        phone: response.phone,
        role: response.role,
        username: response.username,
      });
    });
  }
});

/**
 * Export
 */
module.exports = router;
