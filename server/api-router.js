const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

mongoose.connect('mongodb://localhost:27017/test');

router.use(bodyParser.urlencoded({extended: true}));

const UserSchema = new mongoose.Schema({
  name: String,
});
const User = mongoose.model('User', UserSchema);
const TaskSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
const Task = mongoose.model('Task', TaskSchema);

router.get('/user', (req, res) => {
  User.find({}).exec().then((response) => {
    res.json(response);
  });
});

router.get('/user/:id', (req, res) => {
  User.findById(req.param('id')).exec().then((response) => {
    res.json(response);
  });
});

router.post('/user/create', (req, res) => {
  User.create(req.body).then((response) => {
    res.json(response);
  });
});

module.exports = router;