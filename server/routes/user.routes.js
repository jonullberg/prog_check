'use strict';
var logError = require('../lib/log_error');
var User = require('../models/User');
var bodyparser = require('body-parser');
var nodemailer = require('nodemailer');
var jwtAuth = require('../lib/jwt_auth')(process.env.APP_SECRET);
function userRouter(router, passport) {
    router.use(bodyparser.json());
    router.post('/create_user', createUser);
    router.put('/users/:userId', jwtAuth, updateUserById);
    router.get('/sign_in', passport.authenticate('basic', { session: false }), signInUser);
    router.get('/auth_token', jwtAuth, sendToken);
    router.post('/forgot', sendForgotPasswordEmail);
    router.get('/reset/:idToken', generateResetToken);
    router.post('/reset/:idToken', checkResetToken);
    router.get('/users', jwtAuth, getAllUsers);
    function createUser(req, res) {
        var newUserData = JSON.parse(JSON.stringify(req.body));
        delete newUserData.email;
        delete newUserData.password;
        var newUser = new User(newUserData);
        newUser.basic.email = req.body.email;
        if (!req.body.password) {
            logError('No password submitted', 401, 'No Password Submitted');
        }
        newUser.generateHash(req.body.password, updateHash);
        function updateHash(err, hash) {
            if (err) {
                logError(err, 500, 'Internal Server Error');
            }
            newUser.basic.password = hash;
            newUser.basic.tokenExpiration = createExpirationDate();
            newUser.save(generateToken);
            function generateToken(err, user) {
                if (err) {
                    logError(err, 500, 'Internal Server Error');
                }
                user.generateToken(process.env.APP_SECRET, sendToken);
                function sendToken(token) {
                    res.json({
                        'token': token
                    });
                }
            }
        }
    }
    function signInUser(req, res) {
        req.user.generateToken(process.env.APP_SECRET, sendToken);
        function sendToken(token) {
            res.json({
                'token': token
            });
        }
    }
    function sendToken(req, res) {
        res.json({
            'token': req.token
        });
    }
    function sendForgotPasswordEmail(req, res) {
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
        }, writeAndSendEmail);
        function writeAndSendEmail(err, data) {
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
            transport.sendMail(mailOptions, sendingForgotEmail);
            res.json({
                'msg': 'We have sent an email to the email provided with this account, please check that email to reset your password.'
            });
            function sendingForgotEmail(err, info) {
                if (err) {
                    logError(err, 500, 'Internal Server Error');
                }
            }
        }
    }
    function generateResetToken(req, res) {
        res.send('<div><h2>Reset Your Password</h2><p>Please type in a new password</p><form action="/api/reset/' + req.params.idToken + '" method="POST"><label>New Password<input type="password" placeholder="Password" /></label></form></div>');
    }
    function checkResetToken(req, res) {
        User.findOne({ 'basic.email': req.body.email }, resetPassword);
        function resetPassword(err, user) {
            var currentTime = new Date();
            var resetData = user.reset;
            if (resetData && resetData.resetToken === req.params.idToken && currentTime <= resetData.expiration) {
                user.generateHash(req.body.newPassword, nullResetToken);
                function nullResetToken(err, hash) {
                    if (err) {
                        logError(err, 500, 'Internal Server Error');
                    }
                    user.basic.password = hash;
                    user.reset.resetToken = null;
                    user.reset.resetToken = null;
                    user.save(checkForError);
                    function checkForError(err, data) {
                        if (err) {
                            logError(err, 500, 'Internal Server Error');
                        }
                        return res.end();
                    }
                }
            }
        }
    }
    function getAllUsers(req, res) {
        User.find({}, sendUsers);
        function sendUsers(err, users) {
            if (err) {
                logError(err, 500, 'Internal Server Error');
            }
            res.json({
                'users': users
            });
        }
    }
    function updateUserById(req, res) {
        var newUser = req.body;
        User.update({ '_id': req.params.userId }, newUser, sendNewUser);
        function sendNewUser(err, user) {
            if (err) {
                logError(err, 500, 'Internal Server Error');
            }
            res.json({
                'teacher': newUser
            });
        }
    }
}
;
function createExpirationDate() {
    var expDate = new Date();
    expDate.setDate(expDate.getDate() + 7);
    return expDate;
}
module.exports = userRouter;
