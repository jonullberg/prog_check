'use strict';

var mongoose = require('mongoose');

var attemptSchema = mongoose.Schema({
  'studentId': {
    type: String
  },
  'testId': {
    type: String
  },
  'correctAnswers': Number,
  'questions': Array,
  'dateTaken': {
    type: Date
  },
  'directions': {
    type: String
  },
  'active': {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Attempt', attemptSchema);
