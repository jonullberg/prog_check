'use strict';

var Standard = require('../../../models/Standard');

function getGoal(student, cb) {
  if (student) {
    if (student.goals && student.goals.length) {
      student.goals.forEach(function(goal, i, arr) {
        Standard.findOne({
          'goals._id': goal.goalId
        }, {
          'goals.$': 1
        }, function(err, results) {
          if (results) {
            goal.name = results.goals[0].name ?
              results.goals[0].name : null;
            goal.description = results.goals[0].description ?
              results.goals[0].description : null;
          }
          if (i == arr.length - 1) {
            cb(student);
          }
        })
      })
    } else {
      cb(student);
    }

  } else {
    cb(null);
  }
}

module.exports = getGoal;
