/**
 * The routes for all student test attempts for the Prog Check API
 * Created by Jonathan Ullberg on 11/23/2015
 */
'use strict';

declare function require(name: string);
var Attempt = require('../models/Attempt');
var Test = require('../models/Test');

var bodyparser = require('body-parser');

var jwtAuth = require('../lib/jwt_auth')(process.env.APP_SECRET);

export = function(router) {
  router.use(bodyparser.json());
  /**
   * Adds a new test attempt for that student
   */
  router.post('/students/:studentId/tests/', jwtAuth, function(req, res) {
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

  router.get('/students/:studentId/attempts/', jwtAuth, function(req, res) {
    if (req.query.goalId) {
      Test.find({'goalId': req.query.goalId}, function(err, tests) {
        var testId;
        if (tests && tests.length) {
          testId = tests[0]._id;
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
        });
        res.json({
          'attempts': attempts
        });
      });
    }
  });
  router.delete('/students/:studentId/attempts/:attemptId', jwtAuth, function(req, res) {
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
