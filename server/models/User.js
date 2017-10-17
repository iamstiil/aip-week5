/**
 * Import dependencies
 */
const mongoose = require('mongoose');

// Include promise library
mongoose.Promise = global.Promise;

// User roles
const ROLES = ['Administrator', 'User'];

/**
 * Mongooses schema for users
 */
const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  password_digest: String,
  phone: String,
  role: {
    enum: ROLES,
    type: String,
  },
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
