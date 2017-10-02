/**
 * Import dependencies
 */
const mongoose = require('mongoose');

// Include promise library
mongoose.Promise = global.Promise;

/**
 * Mongooses schema for tasks
 */
const RecoverySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

/**
 * Mongoose model for tasks
 */
const Recovery = mongoose.model('Recovery', RecoverySchema);

/**
 * Export
 */
module.exports = Recovery;
