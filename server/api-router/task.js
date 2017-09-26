/**
 * Import dependencies
 */
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

// Initialize user router
const router = express.Router();

// Parse request body stream as json
router.use(bodyParser.json());

router.post('/', (req, res) => {
  const { title, description, user } = req.body;

  console.log(title, description, user);

  res.json({ title, description, user });
});

module.exports = router;
