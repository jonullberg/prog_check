'use strict';

var mongoose = require('mongoose');

var bugSchema = mongoose.Schema({
  'userName': {
    type: String,
    required: true
  },
  'email': {
    type: String,
    required: true
  },
  'attemptedAction': String,
  'reproducingSteps': String,
  'expectedOutcome': String,
  'actualOutcome': String,
  'systemSpecs': String
});

module.exports = mongoose.model('Bug', bugSchema);
