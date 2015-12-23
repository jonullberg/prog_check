'use strict';
var Attempt = require('../models/Attempt');
var Test = require('../models/Test');
var bodyparser = require('body-parser');
var jwtAuth = require('../lib/jwt_auth')(process.env.APP_SECRET);
module.exports = function (router) {
    router.use(bodyparser.json());
    router.post('/students/:studentId/tests/', jwtAuth, function (req, res) {
        var newAttempt = new Attempt(req.body);
        newAttempt.dateTaken = Date.now();
        newAttempt.studentId = req.params.studentId;
        newAttempt.save(function (err, data) {
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
    router.get('/students/:studentId/attempts/', jwtAuth, function (req, res) {
        if (req.query.goalId) {
            Test.find({ 'goalId': req.query.goalId }, function (err, tests) {
                var testId;
                if (tests && tests.length) {
                    testId = tests[0]._id;
                }
                else {
                    return res.json({
                        'attempts': null,
                        'msg': 'There were no tests associated with this goal'
                    });
                }
                Attempt.find({
                    'studentId': req.params.studentId,
                    'testId': testId
                }, function (err, attempts) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            'msg': 'Internal Server Error'
                        });
                    }
                    attempts = attempts.filter(function (attempt) {
                        return attempt.active;
                    });
                    var totalCorrect = 0;
                    var totalPossible = 0;
                    var earliestDate = Date.now();
                    var latestDate = 0;
                    var recent;
                    attempts.forEach(function (attempt) {
                        if (attempt.questions.length === 5) {
                            totalCorrect += (attempt.correctAnswers * 2);
                            totalPossible += 10;
                        }
                        else {
                            totalCorrect += attempt.correctAnswers;
                            totalPossible += 10;
                        }
                        if (attempt.dateTaken < earliestDate) {
                            earliestDate = attempt.dateTaken;
                        }
                        if (attempt.dateTaken > latestDate) {
                            latestDate = attempt.dateTaken;
                            recent = attempt;
                        }
                    });
                    var results = {
                        correct: totalCorrect,
                        possible: totalPossible,
                        earliestTest: earliestDate,
                        latestTest: latestDate,
                        testsTaken: attempts.length,
                        recent: recent,
                        averageCorrect: totalCorrect / attempts.length
                    };
                    res.json({
                        'results': results,
                        'attempts': attempts
                    });
                });
            });
        }
        else {
            Attempt.find({ 'studentId': req.params.studentId }, function (err, attempts) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        'msg': 'Internal Server Error'
                    });
                }
                attempts = attempts.filter(function (attempt) {
                    return attempt.active;
                });
                res.json({
                    'attempts': attempts
                });
            });
        }
    });
    router.delete('/students/:studentId/attempts/:attemptId', jwtAuth, function (req, res) {
        Attempt.findById(req.params.attemptId, function (err, attempt) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    'msg': 'Internal Server Error'
                });
            }
            attempt.active = false;
            attempt.save(function (err, data) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        'msg': 'Internal Server Error'
                    });
                }
                Attempt.find({ studentId: req.params.studentId }, function (err, attempts) {
                    attempts = attempts.filter(function (attempt) {
                        return attempt.active;
                    });
                    res.json({
                        attempts: attempts
                    });
                });
            });
        });
    });
};
