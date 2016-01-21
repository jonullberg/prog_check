'use strict';

var mongoose = require('mongoose');

var attemptSchema = mongoose.Schema({
  'studentId': {
    type: mongoose.Schema.Types.ObjectId
  },
  'testId': {
    type: mongoose.Schema.Types.ObjectId
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
