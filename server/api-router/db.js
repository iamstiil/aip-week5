/**
 * Import dependencies
 */
const mongoose = require('mongoose');
const User = require('../models/User');
const Task = require('../models/Task');

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
 * @return  {Promise}  Promise returning a user with given ID or null
 */
function getUserById(id) {
  return User.findById(id).exec();
}

/**
 * Create new task
 *
 * @param  {string}  title        Task title
 * @param  {string}  description  Task description 
 * @param  {string}  user         ID of User this task is attached to
 * @return  {Promise}  Promise returning the created task
 */
function createTask(title, description, user) {
  return Task.create({
    title,
    description,
    user,
  });
}

/**
 * Get all tasks
 *
 * @return  {Promise}  Promise returning an array of all tasks or empty array
 */
function getTasks() {
  return Task.find({}).exec();
}

/**
 * Get task with a specific id
 *
 * @param  {string}  id  
 * @return  {Promise}  Promise returning a task with given ID or null
 */
function getTaskById(id) {
  return Task.findOne({ _id: id }).exec();
}

/**
 * Update task
 *
 * @param  {Task}  Task used to update
 * @return  {Promise}  Promise returning the updated task
 */
function updateTask(oldTask, newTask) {
  return Task.findOneAndUpdate(oldTask, newTask, {new: true}).exec();
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
  createTask,
  getTasks,
  getTaskById,
  updateTask,
};
