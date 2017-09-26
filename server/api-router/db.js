/**
 * Import dependencies
 */
const mongoose = require('mongoose');
const User = require('../models/User');

/**
 * Connect to MongoDB
 */
mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true });

/**
 * Create new user
 *
 * @param  {string}  email           Email address
 * @param  {string}  password_digest Encrypted password 
 * @param  {string}  username        Username
 * @return  {Promise}  Promise returning the created user
 */
function createUser(email, passwordDigest, username) {
  return User.create({
    email,
    name: '',
    passwordDigest,
    username,
  });
}

/**
 * Get all users
 *
 * @return  {Promise}  Promise returning an array of all users or empty array
 */
function getUsers() {
  return User.find({}).exec();
}

/**
 * Get all users with a specific email address
 *
 * @param  {string}  email  Email address
 * @return  {Promise}  Promise returning an array containing all matching users or empty array
 */
function getUsersByEmail(email) {
  return User.find({ email }).exec();
}

/**
 * Get all users with a specific username
 *
 * @param  {string}  username  Username
 * @return  {Promise}  Promise returning an array containing all matching users or empty array
 */
function getUsersByUsername(username) {
  return User.find({ username }).exec();
}

/**
 * Get user with a specific email
 *
 * @param  {string}  email  Email address
 * @return  {Promise}  Promise returning a user with given email address or null
 */
function getUserByEmail(email) {
  return User.findOne({ email }).exec();
}

/**
 * Get user with a specific ID
 *
 * @param  {string}  id  Mongoose ID
 * @return  {Promise}  Promise returning the created user
 */
function getUserById(id) {
  return User.findById(id).exec();
}

/**
 * Export
 */
module.exports = {
  createUser,
  getUsers,
  getUsersByEmail,
  getUsersByUsername,
  getUserByEmail,
  getUserById,
};
