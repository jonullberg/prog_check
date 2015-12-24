'use strict';

var winston = require('winston'); // Logger

function logError(err, status, message) {
  console.log('Error', err);
  winston.log('error', {
    'Error': err,
    timestamp: Date.now(),
    pid: process.pid
  });
  return res.status(status).json({
    'msg': message
  });
}

module.exports = logError;
