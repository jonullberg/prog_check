'use strict';

var User = require('../models/User');
var bodyparser = require('body-parser');
// var passport = require('passport');

module.exports = function(router, passport) {
	router.use(bodyparser.json());

	router.post('/create_user', function(req, res) {
		var newUserData = JSON.parse(JSON.stringify(req.body));
		delete newUserData.email;
		delete newUserData.password;

		var newUser = new User(newUserData);
		newUser.basic.email = req.body.email;
		if(req.body.password === undefined) {
			console.log('No password submitted');
			return res.status(401).json({
				'msg': 'No Password Submitted'
			});
		}
		newUser.generateHash(req.body.password, function(err, hash) {
			if(err) {
				console.log(err);
				return res.status(500).json({
					'msg': 'Internal Server Error'
				});
			}
			newUser.basic.password = hash;
			newUser.save(function(err, user) {
				if(err) {
					console.log(err);
					return res.status(500).json({
						'msg': 'Internal Server Error'
					});
				}

				user.generateToken(process.env.APP_SECRET, function(err, token) {
					if(err) {
						console.log(err);
						return res.status(500).json({
							'msg': 'Internal Server Error'
						});
					}

					res.json({
						'token': token
					}); // end res.json
				}); // end generate Token
			}); // end user save
		}); // end generate hash
	}); // end POST

	router.get('/sign_in', passport.authenticate('basic', {session:false}), function(req, res) {
	  req.user.generateToken(process.env.APP_SECRET, function(err, token) {
	    if (err) {
	      console.log(err);
	      return res.status(500).json({msg: 'error generating token'});
	    }

	    res.json({msg: 'authenticated as: ' + req.user.basic.email, username: req.user.username, token: token});
	  });//end generateToken
	});//end GET
};
