'use strict';

var eat = require('eat');
var User = require('../models/User');
var Student = require('../models/Student');

module.exports = function(secret) {
  return function(req, res, next) {
    var authHeader = req.headers['authorization'];
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

    eat.decode(token, secret, function(err, decoded) {
      if (err) {
        console.log(err);
        return res.status(401).json({
          'msg': 'Not Authorized'
        });
      }
      if (req.headers.role === 'teacher' || req.headers.role === 'admin') {
        return User.findOne({_id: decoded.id}, function(err, user) {
          if (err) {
            console.log(err);
            return res.status(401).json({
              'msg': 'Not Authorized'
            });
          }

          if (!user) {
            console.log('No Such User for that Token');
            return res.status(401).json({
              'msg': 'Not Authorized'
            });
          }
          if (user.basic.tokenExpiration < Date.now()) {
            console.log('Token was expired');
            return res.status(401).json({
              'msg': 'Not Authorized. Token expired.'
            });
          }
          req.user = user;
          next();
        });

      } else if (req.headers.role === 'student') {
        Student.findOne({_id: decoded.id}, function(err, user) {
          if (err) {
            console.log(err);
            return res.status(401).json({
              'msg': 'Not Authorized'
            });
          }

          if (!user) {
            console.log('No such student for that token');
            return res.status(401).json({
              'msg': 'Not Authorized'
            });
          }
          if (user.basic.tokenExpiration < Date.now()) {
            console.log('Token was expired');
            return res.status(401).json({
              'msg': 'Not Authorized. Token expired.'
            });
          }
          req.user = user;
          req.token = token;
          next();
        });
      }
    });
  };
};
