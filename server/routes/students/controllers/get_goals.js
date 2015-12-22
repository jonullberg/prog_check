'use strict';

var Standard = require('../../../models/Standard');

function getGoal(student, cb) {
  if (student.goals && student.goals.length) {
    student.goals.forEach(function(goal, i, arr) {
      console.log('goal', goal);
      Standard.findOne({
        'goals._id': goal.goalId
      }, {
        'goals.$': 1
      }, function(err, results) {
        if (results) {
          goal.name = results.goals[0].name;
          goal.description = results.goals[0].description;
        }
        if (i == arr.length - 1) {
          cb(student);
        }
      })
    })
  } else {
    cb(student);
  }
}

module.exports = getGoal;
