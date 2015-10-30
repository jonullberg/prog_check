'use strict';

var Tests = require('../models/Test');
var Attempt = require('../models/Attempt');
var bodyparser = require('body-parser');
var eatAuth = require('../lib/eat_auth')(process.env.APP_SECRET);
var path = require('path');
var fs = require('fs');

module.exports = function(router) {
  router.use(bodyparser.json());

  router.post('/tests', eatAuth, function(req, res) {
    var newTest = new Tests(req.body);
    newTest.save(function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }
      res.json(data);
    });
  });

  router.get('/tests/attempts/:studentId', eatAuth, function(req, res) {
    Attempt.find({'studentId': req.params.studentId}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }
      res.json(data);
    });
  });

  router.post('/tests/attempts', eatAuth, function(req, res) {
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
        'msg': 'Success'
      });
    });
  });

  router.get('/tests', eatAuth, function(req, res) {
    if (req.query.standardId) {
      Tests.find({standardId: req.query.standardId}, function (err, tests) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            'msg': 'Internal Server Error'
          });
        }
        res.json({
          'tests': tests
        });
      });
    } else {
      Tests.find({}, function(err, tests) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            'msg': 'Internal Server Error'
          });
        }
        res.json({
          'tests': tests
        });
      });
    }
  });

  /**
   * Gets a single test from the database
   * @param  {Object} req  The request object
   * @param  {Object} res  The response object
   * @return {Object}      An object with the test attached to it
   */
  router.get('/tests/:testId', eatAuth, function(req, res) {
    Tests.findById(req.params.testId, function(err, test) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }
      res.json({
        'test': test
      });
    });
  });

  router.get('/tests/goal/:goalId', eatAuth, function(req, res) {
    Tests.find({goalId: req.params.goalId}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }
      res.json(data);
    });
  });

  /**
   * Updates a test in the database
   * @param  {Object} req           The request object
   * @param  {Object} res           The response object
   * @return {Object}               Sends back a success message
   */
  router.put('/tests/:id', eatAuth, function(req, res) {
    var updatedTest = req.body;
    Tests.update({_id: req.params.id},
      updatedTest, function(err) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            'msg': 'Internal Server Error'
          });
        }

        res.json({
          'msg': 'Success'
        });
      });
  });

  /**
   * Deletes a test from the database
   * @param  {Object} req           The request object
   * @param  {Object} res)          The response object
   * @return {Object}               Sends back a success message
   */
  router.delete('/tests/:id', eatAuth, function(req, res) {
    Tests.remove({'_id': req.params.id},
      function(err, data) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            'msg': 'Internal Server Error'
          });
        }
        res.json({
          'msg': 'Success'
        });
      });
  });

  router.post('/tests/:id/questions/image', eatAuth, function(req, res) {
    var uploadPath = null;
    req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {

      var tmpUploadPath = path.join(__dirname, "../build/uploads/", filename);
      uploadPath = '/uploads/' + filename;

      file.pipe(fs.createWriteStream(tmpUploadPath));
    });
    req.busboy.on('finish', function() {
      res.json({
        'filePath': uploadPath
      });
    });

  });

  /**
   * Deletes a specific question from a test
   * @param  {Object} req  The request object
   * @param  {Object} res) The response object
   * @return {Object}      Returns the new test
   */
  router.delete('/tests/:testId/questions/:questionId', eatAuth, function(req, res) {
    Tests.findById(req.params.testId, function(err, test) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }
      test.questions = test.questions.filter(function(question) {
        if (question._id != req.params.questionId) {
          return question;
        }
      });
      test.save(function(err, data) {
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
  });

};
