'use strict';

var Test = require('../models/Test');
var bodyparser = require('body-parser');
var eatAuth = require('../lib/eat_auth')(process.env.APP_SECRET);

module.exports = function(router) {
  router.use(bodyparser.json());

  router.post('/tests', eatAuth, function(req, res) {
    var newTest = new Test(req.body);
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

  router.get('/tests', eatAuth, function(req, res) {
    Test.find({}, function(err, data) {
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
    Test.update({_id: req.params.id},
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
    Test.remove({'_id': req.params.id},
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

  router.post('/tests/:id/questions', function(req, res) {
    console.log(req)
  })

};
