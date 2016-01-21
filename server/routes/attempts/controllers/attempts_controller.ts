'use strict';

var Student = require('../../../models/Student');
var Attempt = require('../../../models/Attempt');
var Test = require('../../../models/Test');
var logError = require('../../../lib/log_error');
var getGoals = require('../../students/controllers/get_goals');
var scoreTest = require('./score_test');
var mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

var attemptsController = {
  createAttempt: createAttempt,
  getStudentAttempts: getStudentAttempts,
  deleteAttempt: deleteAttempt
};

export = attemptsController;

/**
 * When a student takes a test attempt, the results are sent to this endpoint.
 * @param {[type]} req [description]
 * @param {[type]} res [description]
 */
function createAttempt(req, res) {
  var newAttempt = new Attempt(req.body);
  var dateTaken = Date.now();
  newAttempt.dateTaken = dateTaken;
  newAttempt.studentId = req.params.studentId;
  newAttempt = scoreTest(newAttempt);
  Student.findOneAndUpdate({
    '_id': req.params.studentId,
    'goals.goalId': req.query.goalId
  },
  {
    '$set': {
      'goals.$.dateLastTaken': dateTaken
    }
  },
  function(err, student) {
    if (err) {
      logError(err, 500, 'Internal Server Error');
    }
    student = student.toObject();
    student.goals.forEach(updateGoal);
    getGoals(student, function(newStudent) {
      newAttempt.save(sendAttempt);
      function sendAttempt(err, attempt) {
        if (err) {
          logError(err, 500, 'Internal Server Error');
        }
        res.json({
          'attempt': attempt,
          'student': newStudent,
          'token': req.token
        });
      }

    })
    function updateGoal(goal) {
      if (goal.goalId === req.query.goalId) {
        goal.dateLastTaken = dateTaken;
      }
    }
  });
  // This is hacky and there should be a better version with Mongoose or Mongo
  // to check a string as an ID.
  // TODO: Implement better function to check if ObjectId or string
  function checkObjectId(id) {
    return (typeof id === 'string') ?
      'ObjectId(' + id + ')' :
      id;
  }
}
function getStudentAttempts(req, res) {
  if (req.query.goalId) {
    Test.find({ 'goalId': req.query.goalId }, processTestByGoalId);
  } else {
    Attempt.find({ 'studentId': req.params.studentId }, processTestByStudentId);
  }

  function processTestByStudentId(err, attempts) {
    if (err) {
      logError(err, 500, 'Internal Server Error');
    }
    attempts = attempts.filter(filterActiveAttempts);
    res.json({
      'attempts': attempts
    });
  }

  function processTestByGoalId(err, tests) {
    if (!tests || !tests.length) {
      return res.json({
        'attempts': null,
        'msg': 'There were no tests associated with this goal'
      });
    }
    var testId = tests[0]._id;
    Attempt
      .find({
        'studentId': req.params.studentId,
        'testId': testId
      })
      .lean()
      .exec(processAttempts);

    function processAttempts(err, attempts) {
      if (err) {
        logError(err, 500, 'Internal Server Error');
      }
      attempts = attempts
        .filter(filterActiveAttempts);
      var totalCorrect = 0;
      var totalPossible = 0;
      var earliestDate = Date.now();
      var latestDate = 0;
      var recent;
      attempts
        .forEach(processAttempt);
      var results = {
        correct: totalCorrect,
        possible: totalPossible,
        earliestTest: earliestDate,
        latestTest: latestDate,
        testsTaken: attempts.length,
        recent: recent,
        averageCorrect: totalCorrect / attempts.length
      };
      res.json({
        'results': results,
        'attempts': attempts
      });
      function processAttempt(attempt) {
        if (attempt.questions.length === 5) {
            totalCorrect += (attempt.correctAnswers * 2);
            totalPossible += 10;
        } else {
            totalCorrect += attempt.correctAnswers;
            totalPossible += 10;
        }
        if (attempt.dateTaken < earliestDate) {
            earliestDate = attempt.dateTaken;
        }
        if (attempt.dateTaken > latestDate) {
            latestDate = attempt.dateTaken;
            recent = attempt;
        }
      }
    }
  }
}
function deleteAttempt(req, res) {
  Attempt
    .findById(req.params.attemptId, archiveAttempt);
  function archiveAttempt(err, attempt) {
    if (err) {
      logError(err, 500, 'Internal Server Error');
    }
    attempt.active = false;
    attempt
      .save(saveArchivedAttempt);

    function saveArchivedAttempt(err, data) {
      if (err) {
        logError(err, 500, 'Internal Server Error');
      }
      Attempt
        .find({
          studentId: req.params.studentId
        })
        .lean()
        .exec(sendAttempts);
      function sendAttempts(err, attempts) {
        attempts = attempts
          .filter(filterActiveAttempts);
        res.json({
          attempts: attempts
        });
      }
    }
  }
}
function filterActiveAttempts(attempt) {
  return attempt.active;
}
