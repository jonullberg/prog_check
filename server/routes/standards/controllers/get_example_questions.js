'use strict';

var Test = require('../../../models/Test');

function getExampleQuestions(standards, cb) {
  standards.forEach(function(standard, i, arr1) {
    standard = standard.toObject();
    standard.goals.forEach(function(goal, j, arr2) {
      Test.findOne({
        'goalId': goal._id
      }, function(err, test) {
        if (test && test.questions) {
          var question = test.questions[0];
          if (test && question) {
            goal.exampleQuestion = test.questions[Math.floor(Math.random() * test.questions.length)].question;
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
