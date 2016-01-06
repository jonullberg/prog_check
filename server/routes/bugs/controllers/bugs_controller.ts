'use strict';

var Bug = require('../../../models/Bug');
var Log = require('../../../models/Log');

var winston = require('winston');
var nodemailer = require('nodemailer');
var logError = require('../../../lib/log_error');

module.exports = {
  createBug: createBug,
  getBugs: getBugs,
  createLog: createLog
};


function createBug(req, res) {
  var newBug = new Bug(req.body);
  newBug.save(saveBug);
  function saveBug(err, data) {
    if (err) {
      return logError(err, 500, 'Internal Server Error');
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

    transport.sendMail(mailOptions, handleMail);
    function handleMail(err, info) {
      if (err) {
        return logError(err, 500, 'We could not send an email to the admin.');
      }
      res.json({
        'msg': 'Thank you for submitting a bug. We will look into that immediately'
      });
    }

  }
}

function getBugs(req, res) {
  Bug.find({}, sendBugs);
  function sendBugs(err, bugs) {
    if (err) {
      return logError(err, 500, 'Internal Server Error');
    }
    res.json({
      bugs: bugs
    });
  }
}

function createLog(req, res) {
  var newLog = new Log(req.body);
  newLog.save(saveLog);

  function saveLog(err, data) {
    if (err) {
      return logError(err, 500, 'Internal Server Error');
    }
    res.end();
  }
}
