'use strict';

var User = require('../../../models/User');

var logError = require('../../../lib/log_error');
var nodemailer = require('nodemailer');

module.exports = {
  sendForgotPasswordEmail: sendForgotPasswordEmail,
  generateResetToken: generateResetToken,
  checkResetToken: checkResetToken
};

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
    var expireTime = time + 1000*36000;
    return expireTime;
  }

  User.update({ 'basic.email': req.body.email }, {
    'reset.resetToken': token,
    'reset.expiration': expiration
  }, writeAndSendEmail);

  // TODO: Refactor this email into its own template. Handlebars? This is fugly
  function writeAndSendEmail(err, data) {
    var emailText = '<h1>Prog Check Password Reset Request</h1>';
    emailText += '<p>Someone has requested a password reset for this email account on progcheck.com</p>';
    emailText += '<p>If this was not you, do not worry. Simply ignore this email and your email and password are secure.<br />';
    emailText += 'If this was you, please follow these instructions:</p><ol><li>Go to <a href="https://progcheck.com">Prog Check</a></li><li>Copy and past this link in your browser</li><br />';
    emailText += '<a href="https://progcheck.com/api/reset/' + encodeURIComponent(token) + '">Reset Password</a><br /><li>Follow the instructions to reset your password</li></p>';
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
  // TODO: Refactor this template to its own file. This is fugly.
  res.send('<div><h2>Reset Your Password</h2><p>Please type in a new password</p><form action="/api/reset/' + req.params.idToken + '" method="POST"><label>New Password<input type="password" placeholder="Password" /></label></form></div>');
}

function checkResetToken(req, res) {
  User.findOne({ 'basic.email': req.body.email }, resetPassword);
  function resetPassword(err, user) {
    var currentTime = new Date();
    var resetData = user.reset;
    if (resetData && resetData.resetToken === req.params.idToken && currentTime <= resetData.expiration) {
      user.generateHash(req.body.newPassword, nullResetToken);
    }
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
