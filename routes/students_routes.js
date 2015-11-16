'use strict';

var Students = require('../models/Student');
var Attempts = require('../models/Attempt');
var Standards = require('../models/Standard');
var Tests = require('../models/Test');
var bodyparser = require('body-parser');
var eatAuth = require('../lib/eat_auth')(process.env.APP_SECRET);

module.exports = function(router, passport) {
  router.use(bodyparser.json());

  /**
   * Creates a new student
   */
  router.post('/students', eatAuth, function(req, res) {
    var newStudentData = JSON.parse(JSON.stringify(req.body));
    var newStudent = new Students(newStudentData);
    if (req.body.basic.pin === undefined) {
      console.log('No PIN submitted');
      return res.status(401).json({
        'msg': 'No PIN submitted'
      });
    }
    newStudent.save(function(err, student) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }
      res.json({
        'student': student
      }); // end res.json
    }); // end save
  });

  /**
   * Gets a specific student from the server based on their ID
   */
  router.get('/students/:studentId', eatAuth, function(req, res) {
    Students.findById(req.params.studentId, function(err, student) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }
      res.json({
        'student': student
      });
    });
  });

  /**
   * Signs in a student with their PIN and username
   */
  router.get('/sign_in/students', passport.authenticate('studentBasic', {session:false}), function(req, res) {
    req.user.generateToken(process.env.APP_SECRET, function(err, token) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'There was an error generating token'
        });
      }
      Student.findById(req.user._id, function(err, student) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            'msg': 'Internal Server Error'
          });
        }
        var expDate = new Date();
        expDate.setDate(expDate.getDate() + 7);
        student.basic.tokenExpiration = expDate;
        student.save(function(err, data) {
          if (err) {
            console.log(err);
            return res.status(500).json({
              'msg': 'Internal Server Error'
            });
          }
          data.role = 'student';
          res.json({
            'user': data,
            'token': token
          });
        });
      });
    });
  });

  /**
   * Gets all students for a specific teacher from the server
   */
  router.get('/students', eatAuth, function(req, res) {
    Students.find({'teacherId': req.user._id}, function(err, students) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }
      res.json({
        students: students
      });
    });
  });

  /**
   * Updates a student by their ID
   */
  router.put('/students/:studentId', eatAuth, function(req, res) {
    var updatedStudent = req.body;
    // delete updatedStudent._id;
    Students.update({'_id': req.params.studentId}, updatedStudent, function(err, response) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            'msg': 'Internal Server Error'
          });
        }
        res.json({
          'student': updatedStudent
        });
      });
  });

  /**
   * Removes a student by their id
   */
  router.delete('/students/:studentId', eatAuth, function(req, res) {
    Students.remove({'_id': req.params.studentId}, function(err, data) {
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
   * Adds the new goal to the student
   */
  router.post('/students/:studentId/goals/', eatAuth, function(req, res) {
    var goal = req.body;
    goal.active = true;
    goal.goalId = goal._id;
    delete goal._id;
    goal.priority = null;
    Students.findById(req.params.studentId, function(err, student) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }
      student.goals.push(goal);
      student.save(function(err, data) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            'msg': 'Internal Server Error'
          });
        }
        res.json({
          'student': data
        });
      });
    });
  });
  /**
   * Updates a students goal by id
   */
  router.put('/students/:studentId/goals/:goalId', eatAuth, function(req, res) {
    var goal = req.body;
    Students.findById(req.params.studentId, function(err, student) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }
      student.goals.splice(student.goals.indexOf(goal), 1, goal);
      student.save(function(err, data) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            'msg': 'Internal Server Error'
          });
        }
        res.json({
          'student': data
        });
      });
    });
  });
  /**
   * Deletes/Archives a goal for a student
   */
  router.delete('/students/:studentId/goals/:goalId', eatAuth, function(req, res) {
    Students.findById(req.params.studentId, function(err, student) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }
      var results = student.goals.filter(function(goal) {
        return goal._id == req.params.goalId;
      });
      student.archivedGoals.push(results[0]);
      student.goals.splice(student.goals.indexOf(results[0]), 1);
      student.save(function(err, data) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            'msg': 'Internal Server Error'
          });
        }
        res.json({
          'student': student
        });
      });
    });
  });
};
