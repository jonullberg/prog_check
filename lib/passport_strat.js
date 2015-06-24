'use strict';

var BasicStrategy = require('passport-http').BasicStrategy;
var passport = require('passport');
var User = require('../models/User');

module.exports = function(passport) {
	passport.use('basic', new BasicStrategy({}, function(username, password, done) {
		User.findOne({'basic.username': username}, function(err, user) {
			if(err) return done('Database error');

			if(!user) return done('No such user');

			user.checkPassword(password, function(err, res) {
				if(!res) return done('Wrong Password');

				return done(null, user);
			});
		});
	}));
};
