'use strict';

var mongoose = require('mongoose');

var questionSchema = mongoose.Schema({
  'question': {
    type: String
  },
  'correct': {
    type: String
  },
  'answers': {
    type: Array
  }
});

var testSchema = mongoose.Schema({
  'standardId': {
    type: String
  },
  'goalName': {
    type: String
  },
  'goalDescription': {
    type: String
  }
  'testDirections': {
    type: String
  },
  'goalId': {
    type: String
  },
  'questions': [questionSchema]
});

testSchema.pre('validate', function(next) {
  var doc = this;
  if (doc.testName === undefined) {
    doc.testName =
    mongoose.model('Test').count(function(err, num) {
      if (err) return next(err);

      var number = num + 1;

      doc.testName = 'Test ' + number;
      next();
    });
  } else {
    next();
  }
});

module.exports = mongoose.model('Test', testSchema);
