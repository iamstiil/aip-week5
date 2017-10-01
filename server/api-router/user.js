/**
 * Import dependencies
 */
const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db');

// Initialize user router
const router = express.Router();

// Parse request body stream as json
router.use(bodyParser.json());

// Handle user list request
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
        role: user.role,
        username: user.username,
      });
      return user;
    });
    res.json(users);
  });
});

// Handle user request by id
router.get('/:id', (req, res) => {
  // Fetch user with id from database
  db.getUserById(req.param('id')).then((response) => {
    res.json(response);
  });
});

// Handle user update by id
router.put('/:id', (req, res) => {
  // Fetch user with id from database
  db.updateUserById({ _id: req.params.id }, req.body).then((response) => {
    res.json({
      email: response.email,
      id: response._id,
      name: response.name,
      role: response.role,
      username: response.username,
    });
  });
});

// Handle user deletion by id
router.delete('/:id', (req, res) => {
  if (req.params.id === req.body.id) {
    db.deleteUserById({ _id: req.params.id }).then((response) => {
      res.json({
        email: response.email,
        id: response._id,
        name: response.name,
        role: response.role,
        username: response.username,
      });
    });
  }
});

module.exports = router;
