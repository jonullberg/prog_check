'use strict';

var Student = require('../models/Student');
var bodyparser = require('body-parser');

module.exports = function(router) {
  router.use(bodyparser.json());

  router.post('/students', function(req, res) {
    var newStudent = new Student(req.body);
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

  router.get('/students/:id', function(req, res) {
    Student.find({_id: req.params.id}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }
      res.json(data);
    });
  });

  router.get('/students', function(req, res) {
    Student.find({}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }

      res.json(data);
    });
  });

  router.put('/students/:id', function(req, res) {
    var updatedStudent = req.body;
    delete updatedStudent._id;
    Student.update({_id: req.params.id},
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
