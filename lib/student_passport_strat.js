'use strict';

var BasicStrategy = require('passport-http').BasicStrategy;
var passport = require('passport');
var Students = require('../models/Student');

module.exports = function(passport) {
  passport.use('studentBasic', new BasicStrategy({}, function(username, pin, done) {
    Students.findOne({'basic.username': username}, function(err, student) {
      if(err) return done('Database error');

      if(!student) return done('No such student');

      student.checkPin(pin, function(err, res) {
        if(!res) return done('Wrong Password');
        student.basic.pin = null;
        return done(null, student);
      });
    });
  }));
};
