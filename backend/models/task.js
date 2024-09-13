const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['todo', 'progress', 'completed'],
    default: 'todo',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model('task', taskSchema);

module.exports = Task;