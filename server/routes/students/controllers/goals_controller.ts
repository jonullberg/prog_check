'use strict';

var Students = require('../../../models/Student');

var getGoals = require('./get_goals');

module.exports = {
  addNewGoal: addNewGoal,
  updateStudentGoalById: updateStudentGoalById,
  archiveGoal: archiveGoal
};

// Adds a new goal to a students active list
function addNewGoal(req, res) {
  var goal = req.body;
  goal.active = true;
  goal.goalId = goal._id;
  delete goal._id;
  goal.priority = null;
  Students.findById(req.params.studentId, processStudent);
  function processStudent(err, student) {
    if (err) {
      logError(err, 500, 'Internal Server Error');
    }
    student = student.toObject();
    student.goals.push(goal);
    Students.update({
      _id: student._id
    }, student, getStudentGoals);

    function getStudentGoals(err, data) {
      if (err) {
        logError(err, 500, 'Internal Server Error');
      }
      getGoals(student, sendStudent);
      function sendStudent(newStudent) {
        res.json({
          'student': newStudent
        });
      }
    }
  }
}

// Updates a students goal settings
function updateStudentGoalById(req, res) {
  var goal = req.body;
  Students.findById(req.params.studentId).lean().exec(searchByGoalId);
  function searchByGoalId(err, student) {
    if (err) {
      logError(err, 500, 'Internal Server Error');
    }
    Students.update({
      _id: student._id,
      'goals.goalId': goal.goalId
    }, {
        $set: {
          'goals.$': goal
        }
      }, getStudentGoals);
    function getStudentGoals(err, data) {
      if (err) {
        logError(err, 500, 'Internal Server Error');
      }
      getGoals(student, sendStudent);
      function sendStudent(newStudent) {
        res.json({
          'student': newStudent
        });
      }
    }
  }
}

// Puts a student goal in the archived list rather than the active list
function archiveGoal(req, res) {
  Students.findById(req.params.studentId)
    .lean()
    .exec(processStudent);

  function processStudent(err, student) {
    if (err) {
      logError(err, 500, 'Internal Server Error');
    }
    // TODO: Why is wrong goal getting archived
    var results = student.goals.filter(filterGoalsByGoalId);
    student.archivedGoals.push(results[0]);
    student.goals.splice(student.goals.indexOf(results[0]), 1);
    Students.update({ _id: req.params.studentId }, student, getStudentGoals);
    function getStudentGoals(err, data) {
      if (err) {
        logError(err, 500, 'Internal Server Error');
      }
      getGoals(student, sendStudent);
      function sendStudent(updatedStudent) {
        res.json({
          'student': updatedStudent
        });
      }
    }
    function filterGoalsByGoalId(goal) {
      return goal.goalId == req.params.goalId;
    }
  }
}
