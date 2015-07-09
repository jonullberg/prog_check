'use strict';

var eat = require('eat');
var User = require('../models/User');

module.exports = function(secret) {
  return function(req, res, next) {
    var token = req.headers.token || req.body.token;
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

      User.findOne({_id: decoded.id}, function(err, user) {
        if (err) {
          console.log(err);
          return res.status(401).json({
            'msg': 'Not Authorized'
          });
        }

        if (!user) {
          console.log('No Such User for that Token')
          return res.status(401).json({
            'msg': 'Not Authorized'
          });
        }

        req.user = user;
        next();
      });
    });
  };
};
