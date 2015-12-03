'use strict';

var jwt = require('jsonwebtoken');
var User = require('../models/User');
var Student = require('../models/Student');

module.exports = function(secret) {
  return function(req, res, next) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log('Unauthorized: No Authorization header present');
      return res.status(401).json({
        'msg': 'Not Authorized'
      });
    }
    authHeader = authHeader.split(' ');
    var token = authHeader[1];
    if (!token) {
      console.log('Unauthorized: No Token in Request');
      return res.status(401).json({
        'msg': 'Not authorized'
      });
    }

    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        console.log(err);
        return res.status(401).json({
          'msg': 'Not Authorized'
        });
      }
      req.user = decoded.sub;
      req.token = token;
      next();
    });
  };
};
