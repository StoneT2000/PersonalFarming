// models/Book.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  created_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', UserSchema);
