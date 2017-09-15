const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const TaskSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
