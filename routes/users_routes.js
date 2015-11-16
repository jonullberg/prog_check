'use strict';

var User = require('../models/User');
var bodyparser = require('body-parser');
var nodemailer = require('nodemailer');

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
					user.basic.password = null;
					user.fullName = user.firstName + ' ' + user.lastName;
					res.json({
						'user': user,
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
	    req.user.basic.password = null;
	    req.user.fullName = req.user.firstName + ' ' + req.user.lastName;
	    res.json({
	    	'user':req.user,
	    	'token': token
	    });
	  });//end generateToken
	});//end GET

	router.post('/forgot', function(req, res) {
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

		User.update({'basic.email': req.body.email}, {
			'reset.resetToken': token,
			'reset.expiration': expiration
		}, function(err, user) {
			var emailText = '<h1>Prog Check Password Reset Request</h2>';
			emailText += '<p>Someone has requested a password reset for this email account on progcheck.com</p>';
			emailText += '<p>If this was not you, do not worry. Simply ignore this email and your email and password are secure.</p>';
			emailText += '<p>If this was you, simply follow this link to reset your password</p>';
			emailText += '<p><a href=\"http://localhost:3000/#/reset/' + encodeURIComponent(token) + '\">Reset Password</a></p>';
			emailText += '<p>Thank you for using Prog Check</p>';
			var mailOptions = {
			  from: 'reset.password@progcheck.com',
			  to: req.body.email,
			  subject: 'Password Reset',
			  html: emailText
			};
			transport.sendMail(mailOptions, function(err, info) {
			  if (err) {
			    return console.log(err);
			  }
			});

			res.json({
				'msg': 'Hello world'
			});
		});
	});

	router.get('/reset/:idToken', function(req, res) {
		res.send('<div><h2>Reset Your Password</h2><p>Please type in a new password</p><form action="/api/reset/' + req.params.idToken + '" method="POST"><label>New Password<input type="password" placeholder="Password" /></label></form></div>');
	});

	router.post('/reset/:idToken', function(req, res) {
		User.findOne({'basic.email': req.body.email}, function(err, user) {
			var currentTime = new Date();
			var resetData = user.reset;
			if (resetData && resetData.resetToken === req.params.idToken && currentTime <= resetData.expiration) {
				user.generateHash(req.body.newPassword, function(err, hash) {
					if (err) {
						console.log(err);
						return res.status(500).json({
							'msg': 'Internal Server Error'
						});
					}
					user.basic.password = hash;
					user.reset.resetToken = null;
					user.reset.resetToken = null;
					user.save(function(err, data) {
						if (err) {
							console.log('There was an error', err);
							return res.status(500).json({
								'msg': 'Internal Server Error'
							});
						}
					});

					return res.end();
				});
			}
		});
	});
};
