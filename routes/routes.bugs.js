'use strict';
var winston = require('winston');
var Bug = require('../models/Bug.js');
var Log = require('../models/Log.js');
var bodyparser = require('body-parser');
var jwtAuth = require('../lib/jwt_auth')(process.env.APP_SECRET);
var adminAuth = require('../lib/admin_auth.js')();
var nodemailer = require('nodemailer');
module.exports = function (router) {
    router.use(bodyparser.json());
    router.post('/bugs', function (req, res) {
        var newBug = new Bug(req.body);
        newBug.save(function (err, data) {
            console.log('hello world');
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
            var transport = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.BUG_EMAIL,
                    pass: process.env.BUG_PW
                }
            });
            var emailText = '<h2>You have a new bug report</h2><ul><li>Name: ' + req.body.userName + '</li>';
            emailText += '<li>Email: ' + req.body.email + '</li>';
            emailText += '<li>What were you trying to do? ' + req.body.attemptedAction + '\n';
            emailText += '<li>What steps did you take to get there? ' + req.body.reproducingSteps + '</li>';
            emailText += '<li>What did you expect to happen? ' + req.body.expectedOutcome + '</li>';
            emailText += '<li>What actually happened? ' + req.body.actualOutcome + '</li></ul>';
            var mailOptions = {
                from: 'bug-reports@progcheck.com',
                to: process.env.BUG_EMAIL,
                subject: 'You have a new bug from ' + req.body.userName,
                html: emailText
            };
            transport.sendMail(mailOptions, function (err, info) {
                if (err) {
                    return winston.log('error', {
                        'Error': err,
                        timestamp: Date.now(),
                        pid: process.pid
                    });
                }
            });
            res.json({
                'msg': 'Thank you for submitting a bug. We will look into that immediately'
            });
        });
    });
    router.get('/bugs', jwtAuth, adminAuth, function (req, res) {
        Bug.find({}, function (err, data) {
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
            res.json(data);
        });
    });
    router.post('/client-log', function (req, res) {
        var newLog = new Log(req.body);
        newLog.save(function (err, data) {
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
            res.end();
        });
    });
};
