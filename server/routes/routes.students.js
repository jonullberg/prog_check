'use strict';
var winston = require('winston');
var Students = require('../models/Student');
var Attempts = require('../models/Attempt');
var Standards = require('../models/Standard');
var Tests = require('../models/Test');
var bodyparser = require('body-parser');
var jwtAuth = require('../lib/jwt_auth')(process.env.APP_SECRET);
var getGoals = require('./students/controllers/get_goals');
module.exports = function (router, passport) {
    router.use(bodyparser.json());
    router.get('/students/sign_in', passport.authenticate('studentBasic', { session: false }), function (req, res) {
        req.user.generateToken(process.env.APP_SECRET, function (token) {
            res.json({
                'token': token
            });
        });
    });
    router.post('/students', jwtAuth, function (req, res) {
        var newStudentData = JSON.parse(JSON.stringify(req.body));
        var newStudent = new Students(newStudentData);
        if (req.body.basic.pin === undefined) {
            winston.log('error', {
                'Error': 'No PIN submitted',
                timestamp: Date.now(),
                pid: process.pid
            });
            return res.status(401).json({
                'msg': 'No PIN submitted'
            });
        }
        newStudent.save(function (err, student) {
            if (err) {
                winston.log('error', {
                    'Error': err,
                    timestamp: Date.now(),
                    pid: process.pid
                });
                return res.status(500).json({
                    'msg': 'Internal Server Error'
                });
            }
            res.json({
                'student': student
            });
        });
    });
    router.get('/students/:studentId', jwtAuth, function (req, res) {
        Students.findOne({ _id: req.params.studentId }, function (err, student) {
            if (student) {
                getGoals(student, function (student) {
                    res.json({
                        student: student
                    });
                });
            }
            else {
                res.end();
            }
        });
    });
    router.get('/students', jwtAuth, function (req, res) {
        Students.find({ 'teacherId': req.user._id }, function (err, students) {
            if (err) {
                winston.log('error', {
                    'Error': err,
                    timestamp: Date.now(),
                    pid: process.pid
                });
                return res.status(500).json({
                    'msg': 'Internal Server Error'
                });
            }
            res.json({
                students: students
            });
        });
    });
    router.put('/students/:studentId', jwtAuth, function (req, res) {
        var updatedStudent = req.body;
        Students.update({ '_id': req.params.studentId }, updatedStudent, function (err, response) {
            if (err) {
                winston.log('error', {
                    'Error': err,
                    timestamp: Date.now(),
                    pid: process.pid
                });
                return res.status(500).json({
                    'msg': 'Internal Server Error'
                });
            }
            getGoals(updatedStudent, function (student) {
                res.json({
                    'student': student
                });
            });
        });
    });
    router.delete('/students/:studentId', jwtAuth, function (req, res) {
        Students.remove({ '_id': req.params.studentId }, function (err, data) {
            if (err) {
                winston.log('error', {
                    'Error': err,
                    timestamp: Date.now(),
                    pid: process.pid
                });
                return res.status(500).json({
                    'msg': 'Internal Server Error'
                });
            }
            res.json({
                'msg': 'Success'
            });
        });
    });
    router.post('/students/:studentId/goals/', jwtAuth, function (req, res) {
        var goal = req.body;
        goal.active = true;
        goal.goalId = goal._id;
        delete goal._id;
        goal.priority = null;
        Students.findById(req.params.studentId, function (err, student) {
            if (err) {
                winston.log('error', {
                    'Error': err,
                    timestamp: Date.now(),
                    pid: process.pid
                });
                return res.status(500).json({
                    'msg': 'Internal Server Error'
                });
            }
            student = student.toObject();
            student.goals.push(goal);
            Students.update({
                _id: student._id
            }, student, function (err, data) {
                if (err) {
                    winston.log('error', {
                        'Error': err,
                        timestamp: Date.now(),
                        pid: process.pid
                    });
                    return res.status(500).json({
                        'msg': 'Internal Server Error'
                    });
                }
                getGoals(student, function (newStudent) {
                    res.json({
                        'student': newStudent
                    });
                });
            });
        });
    });
    router.put('/students/:studentId/goals', jwtAuth, function (req, res) {
        var goal = req.body;
        Students.findById(req.params.studentId, function (err, student) {
            if (err) {
                winston.log('error', {
                    'Error': err,
                    timestamp: Date.now(),
                    pid: process.pid
                });
                return res.status(500).json({
                    'msg': 'Internal Server Error'
                });
            }
            student = student.toObject();
            student.goals.splice(student.goals.indexOf(goal), 1, goal);
            Students.update({ _id: student._id }, student, function (err, data) {
                if (err) {
                    winston.log('error', {
                        'Error': err,
                        timestamp: Date.now(),
                        pid: process.pid
                    });
                    return res.status(500).json({
                        'msg': 'Internal Server Error'
                    });
                }
                getGoals(student, function (newStudent) {
                    res.json({
                        'student': newStudent
                    });
                });
            });
        });
    });
    router.delete('/students/:studentId/goals/:goalId', jwtAuth, function (req, res) {
        Students.findById(req.params.studentId, function (err, student) {
            if (err) {
                winston.log('error', {
                    'Error': err,
                    timestamp: Date.now(),
                    pid: process.pid
                });
                return res.status(500).json({
                    'msg': 'Internal Server Error'
                });
            }
            var results = student.goals.filter(function (goal) {
                return goal.goalId == req.params.goalId;
            });
            student = student.toObject();
            student.archivedGoals.push(results[0]);
            student.goals.splice(student.goals.indexOf(results[0]), 1);
            Students.update({ _id: req.params.studentId }, student, function (err, data) {
                if (err) {
                    winston.log('error', {
                        'Error': err,
                        timestamp: Date.now(),
                        pid: process.pid
                    });
                    return res.status(500).json({
                        'msg': 'Internal Server Error'
                    });
                }
                getGoals(student, function (updatedStudent) {
                    res.json({
                        'student': updatedStudent
                    });
                });
            });
        });
    });
};
