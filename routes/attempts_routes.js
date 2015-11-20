'use strict';

var Attempt = require('../models/Attempt');
var Tests = require('../models/Test');

var bodyparser = require('body-parser');

var jwtAuth = require('../lib/jwt_auth')(process.env.APP_SECRET);

module.exports = function(router) {
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
         res.json({
           'attempts': attempts
         });
       });

     })
   } else {
     Attempt.find({'studentId': req.params.studentId}, function(err, attempts) {
       if (err) {
         console.log(err);
         return res.status(500).json({
           'msg': 'Internal Server Error'
         });
       }
       res.json({
         'attempts': attempts
       });
     });

   }
  });
};
