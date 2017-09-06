const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/test');

app.use(express.static('build'));
app.use(bodyParser.urlencoded({extended: true}));

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

app.get('/api/user', (req, res) => {
  User.find({}).exec().then((response) => {
    res.json(response);
  });
});

app.get('/api/user/:id', (req, res) => {
  User.findById(req.param('id')).exec().then((response) => {
    res.json(response);
  });
});

app.post('/api/user/create', (req, res) => {
  User.create(req.body).then((response) => {
    res.json(response);
  });
});

app.listen(8080, () => {
  console.log('Listening on port 8080');
});