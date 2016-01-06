'use strict';
var Students = require('../../../models/Student');
var Attempts = require('../../../models/Attempt');
var Standards = require('../../../models/Standard');
var Tests = require('../../../models/Test');
var logError = require('../../../lib/log_error');
var getGoals = require('./get_goals');
module.exports = {
    signInStudent: signInStudent,
    createStudent: createStudent,
    getStudentById: getStudentById,
    getAllStudents: getAllStudents,
    updateStudentById: updateStudentById,
    deleteStudentById: deleteStudentById
};
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
    Students.findOne({ _id: req.params.studentId })
        .lean()
        .exec(processStudent);
    function processStudent(err, student) {
        if (student) {
            getGoals(student, sendStudent);
        }
        else {
            res.end();
        }
        function sendStudent(student) {
            res.json({
                student: student
            });
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
