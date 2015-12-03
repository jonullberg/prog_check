'use strict';
var winston = require('winston');
var User = require('../models/User');
var bodyparser = require('body-parser');
var nodemailer = require('nodemailer');
var jwtAuth = require('../lib/jwt_auth')(process.env.APP_SECRET);
function createExpirationDate() {
    var expDate = new Date();
    expDate.setDate(expDate.getDate() + 7);
    return expDate;
}
module.exports = function (router, passport) {
    router.use(bodyparser.json());
    router.post('/create_user', function (req, res) {
        var newUserData = JSON.parse(JSON.stringify(req.body));
        delete newUserData.email;
        delete newUserData.password;
        var newUser = new User(newUserData);
        newUser.basic.email = req.body.email;
        if (!req.body.password) {
            winston.log('error', {
                'Error': 'No password submitted',
                timestamp: Date.now(),
                pid: process.pid
            });
            return res.status(401).json({
                'msg': 'No Password Submitted'
            });
        }
        newUser.generateHash(req.body.password, function (err, hash) {
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
            newUser.basic.password = hash;
            newUser.basic.tokenExpiration = createExpirationDate();
            newUser.save(function (err, user) {
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
                user.generateToken(process.env.APP_SECRET, function (token) {
                    winston.log('info', {
                        'Message': 'User created',
                        timestamp: Date.now(),
                        user: user._id
                    });
                    return res.end();
                    res.json({
                        'token': token
                    });
                });
            });
        });
    });
    router.get('/sign_in', passport.authenticate('basic', { session: false }), function (req, res) {
        req.user.generateToken(process.env.APP_SECRET, function (token) {
            res.json({
                'token': token
            });
        });
    });
    router.get('/auth_token', jwtAuth, function (req, res) {
        res.json({
            'token': req.token
        });
    });
    router.post('/forgot', function (req, res) {
        winston.log('info', {
            'Message': 'Attempted password reset',
            timestamp: Date.now(),
            email: req.body.email
        });
        var transport = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'jonathan.ullberg@gmail.com',
                pass: 'jabsimfyrbfjorws'
            }
        });
        var token = generateToken();
        var expiration = generateExpiration();
        function generateToken() {
            var buf = new Buffer(16);
            for (var i = 0; i < buf.length; i++) {
                buf[i] = Math.floor(Math.random() * 256);
            }
            var id = buf.toString('base64');
            return id;
        }
        function generateExpiration() {
            var now = new Date();
            var time = now.getTime();
            var expireTime = time + 1000 * 36000;
            return expireTime;
        }
        User.update({ 'basic.email': req.body.email }, {
            'reset.resetToken': token,
            'reset.expiration': expiration
        }, function (err, user) {
            var emailText = '<h1>Prog Check Password Reset Request</h2>';
            emailText += '<p>Someone has requested a password reset for this email account on progcheck.com</p>';
            emailText += '<p>If this was not you, do not worry. Simply ignore this email and your email and password are secure.</p>';
            emailText += '<p>If this was you, simply follow this link to reset your password</p>';
            emailText += '<p><a href=\"http://localhost:3000/#/reset/' + encodeURIComponent(token) + '\">Reset Password</a></p>';
            emailText += '<p>Thank you for using Prog Check</p>';
            var mailOptions = {
                from: 'reset.password@progcheck.com',
                to: req.body.email,
                subject: 'Password Reset',
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
                'msg': 'We have sent an email to the email provided with this account, please check that email to reset your password.'
            });
        });
    });
    router.get('/reset/:idToken', function (req, res) {
        res.send('<div><h2>Reset Your Password</h2><p>Please type in a new password</p><form action="/api/reset/' + req.params.idToken + '" method="POST"><label>New Password<input type="password" placeholder="Password" /></label></form></div>');
    });
    router.post('/reset/:idToken', function (req, res) {
        User.findOne({ 'basic.email': req.body.email }, function (err, user) {
            var currentTime = new Date();
            var resetData = user.reset;
            if (resetData && resetData.resetToken === req.params.idToken && currentTime <= resetData.expiration) {
                user.generateHash(req.body.newPassword, function (err, hash) {
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
                    user.basic.password = hash;
                    user.reset.resetToken = null;
                    user.reset.resetToken = null;
                    user.save(function (err, data) {
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
                        winston.log('info', {
                            'Message': 'Password reset',
                            timestamp: Date.now(),
                            userId: data._id
                        });
                        return res.end();
                    });
                });
            }
        });
    });
    router.get('/users', jwtAuth, function (req, res) {
        User.find({}, function (err, users) {
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
                'users': users
            });
        });
    });
    router.put('/users/:userId', jwtAuth, function (req, res) {
        winston.log('info', {
            'Message': 'User updated',
            timestamp: Date.now(),
            userId: req.params.userId
        });
        var newUser = req.body;
        User.update({ '_id': req.params.userId }, newUser, function (err, user) {
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
                'teacher': newUser
            });
        });
    });
};
