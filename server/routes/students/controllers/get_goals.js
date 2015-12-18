'use strict';

var Standard = require('../../../models/Standard');

function getGoal(student, cb) {

  student.goals.forEach(function(goal, i, arr) {
    Standard.findOne({
      'goals._id': goal.goalId
    }, {
      'goals.$': 1
    }, function(err, results) {
      goal.name = results.goals[0].name;
      goal.description = results.goals[0].description;
      if (i == arr.length - 1) {
        cb(student);
      }
    })
  })
}

module.exports = getGoal;
