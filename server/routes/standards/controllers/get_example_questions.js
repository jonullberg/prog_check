'use strict';

var Test = require('../../../models/Test');

function getExampleQuestions(standards, cb) {
  standards.forEach(function(standard, i, arr1) {
    if (!standard) return cb(null);
    standard.goals.forEach(function(goal, j, arr2) {
      Test.findOne({
        'goalId': goal._id
      }, function(err, test) {
        if (test && test.questions) {
          var question = test.questions[0];
          if (test && question) {
            goal.exampleDirections = test.testDirections;
            goal.exampleQuestion = test.questions[0].question;
          } else {
            goal.exampleQuestion = null;
          }
        }
        if (i == arr1.length - 1 && j == arr2.length - 1) {
          cb(standards);
        }
      })
    })
  })
}

module.exports = getExampleQuestions;
