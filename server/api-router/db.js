const mongoose = require('mongoose');
const User = require('../models/User');
const Task = require('../models/Task');
const validateSignupInput = require('../../src/shared/validations');

mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true });

function createUser(email, password_digest, username) {
  return User.create({
    email,
    name: '',
    password_digest,
    username,
  });
}

function getUsers() {
  return User.find({}).exec();
}

function getUsersByEmail(email) {
  return User.find({ email }).exec();
}

function getUsersByUsername(username) {
  return User.find({ username }).exec();
}

function getUserByEmail(email) {
  return User.findOne({ email }).exec();
}

function getUserById(id) {
  return User.findById(id).exec();
}

module.exports = {
  createUser,
  getUsers,
  getUsersByEmail,
  getUsersByUsername,
  getUserByEmail,
};
