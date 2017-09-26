/**
 * Import dependencies
 */
const mongoose = require('mongoose');

// Include promise library
mongoose.Promise = global.Promise;

/**
 * Mongooses schema for tasks
 */
const TaskSchema = new mongoose.Schema({
  title: String,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

/**
 * Mongoose model for tasks
 */
const Task = mongoose.model('Task', TaskSchema);

/**
 * Export
 */
module.exports = Task;
