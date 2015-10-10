'use strict';

var Students = require('../models/Student');
var Attempts = require('../models/Attempt');
var Standards = require('../models/Standard');
var bodyparser = require('body-parser');
var eatAuth = require('../lib/eat_auth')(process.env.APP_SECRET);

module.exports = function(router, passport) {
  router.use(bodyparser.json());

  router.post('/students', function(req, res) {
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
      res.json(student); // end res.json
    }); // end save

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

      req.user.role = 'student';
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

  router.delete('/students/:id', eatAuth, function(req, res) {
    Students.remove({'_id': req.params.id}, function(err, data) {
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

  router.put('/students/:studentId/goals/:goalId', eatAuth, function(req, res) {
    Students.find({'_id': req.params.studentId}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }
      res.json({
        'data': data
      });

    });
  });
  router.get('/students/:studentId/attempts/', eatAuth, function(req, res) {
    Attempts.find({'studentId': req.params.studentId}, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }
      res.json({
        'data': data
      });
    });
  });
  router.put('/students/:studentId/attempts/:attemptId', eatAuth, function(req, res) {
    Attempts.find({
      'studentId': req.params.studentId,
      '_id': req.params.attemptId
    }, function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }
      res.json({
        'data': data
      });
    });
  });
  /**
   * A POST route to add goals to a specific student. This route had to be authenticated with an EAT token
   * @param  {Object} req  The request coming from the client
   * @param  {Object} res) The response object
   */
  router.post('/students/:studentId/goals/', eatAuth, function(req, res) {
    var goal = req.body;
    Standards.find().elemMatch('goals', { _id: { $in: [goal.goalId]}} ).exec(function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          'msg': 'Internal Server Error'
        });
      }
      var returnedGoal = data[0].goals.id(goal.goalId);
      if (returnedGoal.name) {
        goal.description = returnedGoal.name;
      } else if (returnedGoal.description) {
        goal.description = returnedGoal.description;
      } else {
        goal.description = null;
      }
      goal.active = true;
      Students.update({'_id': req.params.studentId}, { $push: {'goals': goal}}, function(err, data) {
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
  });

};
