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
    Tests.find({}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }

      res.json(data);
    });
  });

  router.get('/tests/:testId', eatAuth, function(req, res) {
    Tests.find({_id: req.params.testId}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }
      res.json(data);
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

};
