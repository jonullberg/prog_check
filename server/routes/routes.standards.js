'use strict';
var winston = require('winston');
var Standard = require('../models/Standard');
var bodyparser = require('body-parser');
var jwtAuth = require('../lib/jwt_auth')(process.env.APP_SECRET);
var getExampleQuestions = require('./standards/controllers/get_example_questions');
module.exports = function (router) {
    router.use(bodyparser.json());
    router.get('/standards', function (req, res) {
        Standard.find({}, function (err, data) {
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
            getExampleQuestions(data, function (standards) {
                res.json({
                    'standards': standards
                });
            });
        });
    });
    router.get('/standards/:id', jwtAuth, function (req, res) {
        Standard.findById(req.params.id, function (err, standard) {
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
            getExampleQuestions([standard], function (updatedStandard) {
                res.json({
                    standard: updatedStandard[0]
                });
            });
        });
    });
    router.post('/standards', jwtAuth, function (req, res) {
        var newStandard = new Standard(req.body);
        newStandard.save(function (err, data) {
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
                'standard': data
            });
        });
    });
    router.put('/standards/:id', jwtAuth, function (req, res) {
        var updatedStandard = req.body;
        delete updatedStandard._id;
        Standard.update({ _id: req.params.id }, updatedStandard, function (err) {
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
    router.delete('/standards/:id', jwtAuth, function (req, res) {
        Standard.remove({ '_id': req.params.id }, function (err, data) {
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
    router.post('/standards/:standardId/goals', jwtAuth, function (req, res) {
        var newGoal = req.body;
        Standard.findById(req.params.standardId, function (err, standard) {
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
            if (standard.goals && Array.isArray(standard.goals)) {
                standard.goals.push(newGoal);
                standard.save(function (err, data) {
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
                        'standard': data
                    });
                });
            }
        });
    });
    router.put('/standards/:standardId/goals/:goalId', jwtAuth, function (req, res) {
        var goal = req.body;
        Standard.update({
            '_id': req.params.standardId,
            'goals._id': req.params.goalId
        }, { $set: { 'goals.$': goal } }, function (err, standard) {
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
    router.delete('/standards/:standardId/goals/:goalId', jwtAuth, function (req, res) {
        Standard.findById(req.params.standardId, function (err, standard) {
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
            standard.goals = standard.goals.filter(function (goal) {
                if (goal._id != req.params.goalId) {
                    return goal;
                }
            });
            standard.save(function (err, data) {
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
                    'standard': data
                });
            });
        });
    });
};
