'use strict';

var Students = require('../models/Student');
var bodyparser = require('body-parser');
var eatAuth = require('../lib/eat_auth')(process.env.APP_SECRET);

module.exports = function(router, passport) {
  router.use(bodyparser.json());

  router.post('/students', function(req, res) {
    var newStudentData = JSON.parse(JSON.stringify(req.body));
    delete newStudentData.userName;
    delete newStudentData.pin;

    var newStudent = new Students(newStudentData);

    if (req.body.pin === undefined) {
      console.log('No PIN submitted');
      return res.status(401).json({
        'msg': 'No PIN submitted'
      });
    }

    newStudent.generateHash(req.body.pin, function(err, hash) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }

      newStudent.basic.pin = hash;

      newStudent.save(function(err, student) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            'msg': 'Internal Server Error'
          });
        }
        console.log(student);
        student.generateToken(process.env.APP_SECRET, function(err, token) {
          if (err) {
            console.log(err);
            return res.status(500).json({
              'msg': 'Internal Server Error'
            });
          }

          res.json({
            student: student,
            token: token
          });
        });
      });

    });
  });

  router.get('/students/:id', function(req, res) {
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

  router.get('/sign_in/students', passport.authenticate('studentBasic', {session:false}), function(req, res) {
    req.user.generateToken(process.env.APP_SECRET, function(err, token) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'There was an error generating token'
        });
      }

      res.json({
        'user': req.user,
        'token': token
      });
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
