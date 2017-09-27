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
  // Fetch task list from database
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

router.put('/:taskid', (req, res) => {
  const taskid = req.params.taskid;
  if (!/^[a-f\d]{24}$/.test(taskid)) {
    return res.json(false);
  }

  if (taskid !== req.body.id) {
    return res.json({ errors: { default: 'Task IDs don\'t match' } });
  }

  const reqTask = {
    description: req.body.description,
    title: req.body.title,
    user: req.body.user,
  };

  return db.updateTask({ _id: taskid }, reqTask).then((updatedTask) => {
    if (!updatedTask) {
      return res.status(400).json({ errors: { default: 'Task could not be updated. Please try again.' } });
    }

    return res.json({
      description: updatedTask.description,
      id: updatedTask._id,
      title: updatedTask.title,
      user: updatedTask.user,
    });
  });
});

router.delete('/:taskid', (req, res) => {
  const taskid = req.params.taskid;
  db.deleteTask(taskid).then((task) => {
    if (!task) {
      return res.status(400).json({ errors: { default: 'Task not found.' } });
    }

    return res.json({
      id: task._id,
    });
  });
});

module.exports = router;
