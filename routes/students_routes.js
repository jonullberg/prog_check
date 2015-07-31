'use strict';

var Students = require('../models/Student');
var bodyparser = require('body-parser');
var eatAuth = require('../lib/eat_auth')(process.env.APP_SECRET);

module.exports = function(router) {
  router.use(bodyparser.json());

  router.post('/students', eatAuth, function(req, res) {
    var newStudent = new Students(req.body);
    newStudent.save(function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }

      res.json(data);
    });
  });

  router.get('/students/:id', eatAuth, function(req, res) {
    Students.find({_id: req.params.id}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }
      res.json(data);
    });
  });

  router.get('/students', eatAuth, function(req, res) {
    Students.find({'teacherId': req.user._id}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }
      res.json(data);
    });
  });

  router.put('/students/:id', eatAuth, function(req, res) {
    var updatedStudent = req.body;
    delete updatedStudent._id;
    Students.update({_id: req.params.id},
      updatedStudent, function(err) {
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
};
