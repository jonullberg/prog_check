'use strict';
var logError = require('../lib/log_error');
var Students = require('../models/Student');
var Attempts = require('../models/Attempt');
var Standards = require('../models/Standard');
var Tests = require('../models/Test');
var bodyparser = require('body-parser');
var jwtAuth = require('../lib/jwt_auth')(process.env.APP_SECRET);
var getGoals = require('./students/controllers/get_goals');
function studentRouter(router, passport) {
    router.use(bodyparser.json());
    router.get('/students/sign_in', passport.authenticate('studentBasic', { session: false }), signInStudent);
    router.post('/students', jwtAuth, createStudent);
    router.get('/students/:studentId', jwtAuth, getStudentById);
    router.get('/students', jwtAuth, getAllStudents);
    router.put('/students/:studentId', jwtAuth, updateStudentById);
    router.delete('/students/:studentId', jwtAuth, deleteStudentById);
    router.post('/students/:studentId/goals/', jwtAuth, addNewGoal);
    router.put('/students/:studentId/goals', jwtAuth, updateStudentGoalById);
    router.delete('/students/:studentId/goals/:goalId', jwtAuth, archiveGoal);
    function signInStudent(req, res) {
        req.user.generateToken(process.env.APP_SECRET, sendToken);
        function sendToken(token) {
            res.json({
                'token': token
            });
        }
    }
    function createStudent(req, res) {
        var newStudentData = JSON.parse(JSON.stringify(req.body));
        var newStudent = new Students(newStudentData);
        if (req.body.basic.pin === undefined) {
            logError('No PIN Submitted', 401, 'No PIN Submitted');
        }
        newStudent.save(sendStudent);
        function sendStudent(err, student) {
            if (err) {
                logError(err, 500, 'Internal Server Error');
            }
            res.json({
                'student': student
            });
        }
    }
    function getStudentById(req, res) {
        Students.findOne({ _id: req.params.studentId }).lean().exec(processStudent);
        function processStudent(err, student) {
            if (student) {
                getGoals(student, sendStudent);
                function sendStudent(student) {
                    res.json({
                        student: student
                    });
                }
            }
            else {
                res.end();
            }
        }
    }
    function getAllStudents(req, res) {
        Students.find({ 'teacherId': req.user._id }, sendStudents);
        function sendStudents(err, students) {
            if (err) {
                logError(err, 500, 'Internal Server Error');
            }
            res.json({
                students: students
            });
        }
    }
    function updateStudentById(req, res) {
        var updatedStudent = req.body;
        Students.update({ '_id': req.params.studentId }, updatedStudent, processStudent);
        function processStudent(err, response) {
            if (err) {
                logError(err, 500, 'Internal Server Error');
            }
            getGoals(updatedStudent, sendStudent);
            function sendStudent(student) {
                res.json({
                    'student': student
                });
            }
        }
    }
    function deleteStudentById(req, res) {
        Students.remove({ '_id': req.params.studentId }, sendDeleteMessage);
        function sendDeleteMessage(err, data) {
            if (err) {
                logError(err, 500, 'Internal Server Error');
            }
            res.json({
                'msg': 'Success'
            });
        }
    }
    function addNewGoal(req, res) {
        var goal = req.body;
        goal.active = true;
        goal.goalId = goal._id;
        delete goal._id;
        goal.priority = null;
        Students.findById(req.params.studentId, processStudent);
        function processStudent(err, student) {
            if (err) {
                logError(err, 500, 'Internal Server Error');
            }
            student = student.toObject();
            student.goals.push(goal);
            Students.update({
                _id: student._id
            }, student, getStudentGoals);
            function getStudentGoals(err, data) {
                if (err) {
                    logError(err, 500, 'Internal Server Error');
                }
                getGoals(student, sendStudent);
                function sendStudent(newStudent) {
                    res.json({
                        'student': newStudent
                    });
                }
            }
        }
    }
    function updateStudentGoalById(req, res) {
        var goal = req.body;
        Students.findById(req.params.studentId).lean().exec(searchByGoalId);
        function searchByGoalId(err, student) {
            if (err) {
                logError(err, 500, 'Internal Server Error');
            }
            Students.update({
                _id: student._id,
                'goals.goalId': goal.goalId
            }, {
                $set: {
                    'goals.$': goal
                }
            }, getStudentGoals);
            function getStudentGoals(err, data) {
                if (err) {
                    logError(err, 500, 'Internal Server Error');
                }
                getGoals(student, sendStudent);
                function sendStudent(newStudent) {
                    res.json({
                        'student': newStudent
                    });
                }
            }
        }
    }
    function archiveGoal(req, res) {
        Students.findById(req.params.studentId, processStudent);
        function processStudent(err, student) {
            if (err) {
                logError(err, 500, 'Internal Server Error');
            }
            var results = student.goals.filter(filterGoalsByGoalId);
            student = student.toObject();
            student.archivedGoals.push(results[0]);
            student.goals.splice(student.goals.indexOf(results[0]), 1);
            Students.update({ _id: req.params.studentId }, student, getStudentGoals);
            function getStudentGoals(err, data) {
                if (err) {
                    logError(err, 500, 'Internal Server Error');
                }
                getGoals(student, sendStudent);
                function sendStudent(updatedStudent) {
                    res.json({
                        'student': updatedStudent
                    });
                }
            }
            function filterGoalsByGoalId(goal) {
                return goal.goalId == req.params.goalId;
            }
        }
    }
}
;
module.exports = studentRouter;
