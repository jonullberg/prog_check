'use strict';

var Test = require('../../../models/Test');
var copy = require('deepcopy');
var async = require('async');

function getExampleQuestions(standards, cb) {
  var newStandards = [];
  async.map(standards, function(standard, next) {
    var newStandard = copy(standard);
    async.map(standard.goals, function(goal, next) {
      var newGoal = copy(goal);
      Test.findOne({
        'goalId': goal._id
      })
      .exec(function(err, test) {
        if (test && test.questions && test.questions.length) {
          newGoal.exampleDirections = test.testDirections;
          newGoal.exampleQuestion = test.questions[0].question;
        } else {
          newGoal.exampleDirections = "No Example Question For This Test."
          newGoal.exampleQuestion = "No Example Question For This Test.";
        }
        next(null, newGoal);
      })
    }, function(err, goals) {
      newStandard.goals = goals;
      next(null, newStandard);
    })
  }, function(err, standards) {
    cb(standards);
  });
}

module.exports = getExampleQuestions;
