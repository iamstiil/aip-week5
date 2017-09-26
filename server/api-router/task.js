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

router.get('/', (req, res) => {
  // Fetch user list from database
  db.getTasks().then((response) => {
    const tasks = [];
    // Extract specific fields from response
    response.map((task) => {
      tasks.push({
        description: task.description,
        id: task._id,
        title: task.title,
        user: task.user,
      });
      return task;
    });
    res.json(tasks);
  });
});

router.post('/', (req, res) => {
  const { title, description, user } = req.body;

  if (!title || !user) {
    res.status(400).json({ errors: { default: 'No input registered. Please try again.' } });
  }

  db.createTask(title, description, user).then((task) => {
    if (!task) {
      res.status(400).json({ errors: { default: 'The server had problems creating your task. Pleast try again.' } });
    }

    res.json({
      description: task.description,
      id: task._id,
      title: task.title,
      user: task.user,
    });
  });
});

module.exports = router;
