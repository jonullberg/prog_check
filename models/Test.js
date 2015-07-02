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
  testName: {
    type: String
  },
  'testQuestion': {
    type: String
  },
  'questions': [questionSchema]
});

testSchema.pre('save', function(next) {
  var doc = this;
  if (doc.testName === undefined) {
    mongoose.model('Test').count(function(err, num) {
      if (err) return next(err);

      var number = num + 1;

      doc.testName = 'Test ' + number;
      next();
    });
  }
});

module.exports = mongoose.model('Test', testSchema);
