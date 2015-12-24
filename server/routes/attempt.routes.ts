/**
 * The routes for all student test attempts for the Prog Check API
 * Created by Jonathan Ullberg on 11/23/2015
 */
'use strict';

var Attempt = require('../models/Attempt');
var Test = require('../models/Test');
var bodyparser = require('body-parser');
var jwtAuth = require('../lib/jwt_auth')(process.env.APP_SECRET);
var logError = require('../lib/log_error');

export = function(router) {
  router.use(bodyparser.json())
  ;
  // Adds a new test attempt for that student
  router.post('/students/:studentId/tests/', jwtAuth, createAttempt);
  // Gets all tests for the student at that id
  router.get('/students/:studentId/attempts/', jwtAuth, getStudentAttempts);

  // Deletes an attempt for a student
  router.delete('/students/:studentId/attempts/:attemptId', jwtAuth, deleteAttempt);

  function createAttempt(req, res) {
    var newAttempt = new Attempt(req.body);
    newAttempt.dateTaken = Date.now();
    newAttempt.studentId = req.params.studentId;
    newAttempt.save(sendAttempt);

    function sendAttempt(err, data) {
      if (err) {
        logError(err, 500, 'Internal Server Error');
      }
      res.json({
        'test': data
      });
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

        function filterActiveAttempts(attempt) {
          return attempt.active;
        }
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
};
