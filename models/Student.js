'use strict';

var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
  'firstName': {
    type: String,
    required: true
  },
  'lastName': {
    type: String,
    required: true
  },
  'pin': {
    type: String,
    required: true
  },
  'teacherId': {
    type: String,
    required: true
  },
  'goals': {
    type: Array
  }
});

module.exports = mongoose.model('Student', studentSchema);
