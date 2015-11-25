'use strict';

var Attempt = require('../models/Attempt');
var Tests = require('../models/Test');
var Student = require('../models/Student');

var bodyparser = require('body-parser');

var eatAuth = require('../lib/eat_auth')(process.env.APP_SECRET);

module.exports = function(router) {
  router.use(bodyparser.json());

  /**
   * Adds a new test attempt for that student
   */
  router.post('/students/:studentId/tests/', eatAuth, function(req, res) {
    var newAttempt = new Attempt(req.body);
    newAttempt.dateTaken = Date.now();
    newAttempt.save(function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }

      res.json({
        'test': data
      });
    });
  });

  /**
   * Gets all tests for the student at that id
   */

  router.get('/students/:studentId/attempts/', eatAuth, function(req, res) {
    if (req.query.goalId) {
      Tests.find({'goalId': req.query.goalId}, function(err, tests) {
        if (tests && tests.length) {
          var testId = tests[0]._id;
        } else {
          return res.json({
            'attempts': null,
            'msg': 'There were no tests associated with this goal'
          });
        }
        Attempt.find({
          'studentId': req.params.studentId,
          'testId': testId
        }, function(err, attempts) {
          if (err) {
            console.log(err);
            return res.status(500).json({
              'msg': 'Internal Server Error'
            });
          }
          attempts = attempts.filter(function(attempt) {
            return attempt.active;
          });
          var totalCorrect = 0;
          var totalPossible = 0;
          var earliestDate = Date.now();
          var latestDate = 0;
          attempts.forEach(function(attempt) {
            totalCorrect += attempt.correctAnswers;
            totalPossible += attempt.questions.length;
            if (attempt.dateTaken < earliestDate) {
              earliestDate = attempt.dateTaken;
            }
            if (attempt.dateTaken > latestDate) {
              latestDate = attempt.dateTaken;
            }
          });
          var results = {
            correct: totalCorrect,
            possible: totalPossible,
            earliestTest: earliestDate,
            latestTest: latestDate,
            testsTaken: attempts.length,
            mostRecent: attempts[attempts.length - 1],
            averageScore: this.correct / this.possible
          };
          res.json({
            'results': results,
            'attempts': attempts
          });
        });
      });
    } else {
      Attempt.find({'studentId': req.params.studentId}, function(err, attempts) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            'msg': 'Internal Server Error'
          });
        }
        attempts = attempts.filter(function(attempt) {
          return attempt.active;
        })
        res.json({
          'attempts': attempts
        });
      });
    }
  });
  router.delete('/students/:studentId/attempts/:attemptId', eatAuth, function(req, res) {
    Attempt.findById(req.params.attemptId, function(err, attempt) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }
      attempt.active = false;
      attempt.save(function(err, data) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            'msg': 'Internal Server Error'
          });
        }
        Attempt.find({studentId: req.params.studentId}, function(err, attempts) {
          attempts = attempts.filter(function(attempt) {
            return attempt.active;
          });
          res.json({
            attempts: attempts
          });
        });
      });
    });
  });
};
