const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = new mongoose.Schema({
  email: String,
  name: String,
  password_digest: String,
  username: String,
});

const User = mongoose.model('User', UserSchema);

module.exports = User;