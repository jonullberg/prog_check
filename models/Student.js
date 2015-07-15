'use strict';

var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
  'firstName': {
    type: String
  },
  'lastName': {
    type: String
  },
  'pin': {
    type: String
  },
  'teacherId': {
    type: String
  },
  'goals': {
    type: Array
  }
});

module.exports = mongoose.model('Student', studentSchema);
