'use strict';

var Tests = require('../models/Test');
var Attempt = require('../models/Attempt');
var bodyparser = require('body-parser');
var eatAuth = require('../lib/eat_auth')(process.env.APP_SECRET);
var path = require('path');
var fs = require('fs');

module.exports = function(router) {
  router.use(bodyparser.json());

  /**
   * Creates a new test
   */
  router.post('/tests', eatAuth, function(req, res) {
    var newTest = new Tests(req.body);
    newTest.save(function(err, test) {
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

  /**
   * Gets tests from the database
   */
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
    } else if (req.query.goalId) {
      Tests.find({goalId: req.query.goalId}, function(err, tests) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            'msg': 'Internal Server Error'
          });
        }
        res.json({
          'test': tests[0]
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

  /**
   * Updates a test in the database
   */
  router.put('/tests/:testId', eatAuth, function(req, res) {
    var updatedTest = req.body;
    delete updatedTest._id;
    Tests.update({_id: req.params.testId},
      updatedTest, function(err) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            'msg': 'Internal Server Error'
          });
        }
        res.json({
          'test': updatedTest
        });
      });
  });

  /**
   * Deletes a test from the database
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

  /**
   * Adds a new text question to a test
   */
  router.post('/tests/:testId/questions', eatAuth, function(req,res) {
    if (req.query.type === 'image') {

    } else {
      var newQuestion = req.body;
      Tests.findById(req.params.testId, function(err, test) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            'msg': 'Internal Server Error'
          });
        }
        newQuestion.dateCreated = Date.now();
        test.questions.push(newQuestion);
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
    }
  });

  /**
   * Adds a new image question to a test
   */
  router.post('/tests/:id/questions', eatAuth, function(req, res) {
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
   * Updates a specific text question
   */
  router.put('/tests/:testId/questions/:questionId', eatAuth, function(req, res) {
    var updatedQuestion = req.body;
    delete updatedQuestion._id;
    Tests.update({
      '_id': req.params.testId,
      'questions._id': req.params.questionId},
      {$set: {'questions.$': updatedQuestion}},
      function(err, test) {
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
   * Deletes a specific question from a test
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
