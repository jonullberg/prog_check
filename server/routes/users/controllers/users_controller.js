'use strict';
var User = require('../../../models/User');
var logError = require('../../../lib/log_error');
var nodemailer = require('nodemailer');
module.exports = {
    createUser: createUser,
    signInUser: signInUser,
    sendToken: sendToken,
    getAllUsers: getAllUsers,
    updateUserById: updateUserById,
    createExpirationDate: createExpirationDate
};
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
function createExpirationDate() {
    var expDate = new Date();
    expDate.setDate(expDate.getDate() + 7);
    return expDate;
}
