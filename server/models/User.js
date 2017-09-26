/**
 * Import dependencies
 */
const mongoose = require('mongoose');

// Include promise library
mongoose.Promise = global.Promise;

/**
 * Mongooses schema for users
 */
const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  password_digest: String,
  username: String,
});

/**
 * Mongoose model for users
 */
const User = mongoose.model('User', UserSchema);

/**
 * Export
 */
module.exports = User;
