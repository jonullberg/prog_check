'use strict';

var mongoose = require('mongoose')

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
  'lastUpdated': {
    type: Date,
    default: Date.now
  },
  'directions': {
    type: String
  }
});

module.exports = mongoose.model('Attempt', attemptSchema);
