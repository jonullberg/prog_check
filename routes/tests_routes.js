'use strict';
var Tests = require('../models/Test');
var Attempt = require('../models/Attempt');
var bodyparser = require('body-parser');
var jwtAuth = require('../lib/jwt_auth')(process.env.APP_SECRET);
var path = require('path');
var fs = require('fs');
module.exports = function (router) {
    router.use(bodyparser.json());
    router.post('/tests', jwtAuth, function (req, res) {
        var newTest = new Tests(req.body);
        newTest.save(function (err, test) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    'msg': 'Internal Server Error'
                });
            }
            res.json({
                'test': test
            });
        });
    });
    router.get('/tests', jwtAuth, function (req, res) {
        if (req.query.standardId) {
            Tests.find({ standardId: req.query.standardId }, function (err, tests) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        'msg': 'Internal Server Error'
                    });
                }
                res.json({
                    'tests': tests
                });
            });
        }
        else if (req.query.goalId) {
            Tests.find({ goalId: req.query.goalId }, function (err, tests) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        'msg': 'Internal Server Error'
                    });
                }
                res.json({
                    'test': tests[0]
                });
            });
        }
        else {
            Tests.find({}, function (err, tests) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        'msg': 'Internal Server Error'
                    });
                }
                res.json({
                    'tests': tests
                });
            });
        }
    });
    router.get('/tests/:testId', jwtAuth, function (req, res) {
        Tests.findById(req.params.testId, function (err, test) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    'msg': 'Internal Server Error'
                });
            }
            res.json({
                'test': test
            });
        });
    });
    router.put('/tests/:testId', jwtAuth, function (req, res) {
        var updatedTest = req.body;
        delete updatedTest._id;
        Tests.update({ _id: req.params.testId }, updatedTest, function (err) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    'msg': 'Internal Server Error'
                });
            }
            res.json({
                'test': updatedTest
            });
        });
    });
    router.delete('/tests/:id', jwtAuth, function (req, res) {
        Tests.remove({ '_id': req.params.id }, function (err, data) {
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
    router.post('/tests/:testId/questions', jwtAuth, function (req, res) {
        if (req.query.type === 'image') {
        }
        else {
            var newQuestion = req.body;
            Tests.findById(req.params.testId, function (err, test) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        'msg': 'Internal Server Error'
                    });
                }
                newQuestion.dateCreated = Date.now();
                test.questions.push(newQuestion);
                test.save(function (err, data) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            'msg': 'Internal Server Error'
                        });
                    }
                    res.json({
                        'test': data
                    });
                });
            });
        }
    });
    router.post('/tests/:id/questions', jwtAuth, function (req, res) {
        var uploadPath = null;
        req.busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            var tmpUploadPath = path.join(__dirname, "../build/uploads/", filename);
            uploadPath = '/uploads/' + filename;
            file.pipe(fs.createWriteStream(tmpUploadPath));
        });
        req.busboy.on('finish', function () {
            res.json({
                'filePath': uploadPath
            });
        });
    });
    router.put('/tests/:testId/questions/:questionId', jwtAuth, function (req, res) {
        var updatedQuestion = req.body;
        delete updatedQuestion._id;
        Tests.update({
            '_id': req.params.testId,
            'questions._id': req.params.questionId }, { $set: { 'questions.$': updatedQuestion } }, function (err, test) {
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
    router.delete('/tests/:testId/questions/:questionId', jwtAuth, function (req, res) {
        Tests.findById(req.params.testId, function (err, test) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    'msg': 'Internal Server Error'
                });
            }
            test.questions = test.questions.filter(function (question) {
                if (question._id != req.params.questionId) {
                    return question;
                }
            });
            test.save(function (err, data) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        'msg': 'Internal Server Error'
                    });
                }
                res.json({
                    'test': data
                });
            });
        });
    });
};
