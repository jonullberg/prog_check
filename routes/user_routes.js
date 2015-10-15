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
		console.log(process.env.BUG_EMAIL);
		console.log(process.env.BUG_PW);

		var token = generateToken()

		function generateToken() {
			var buf = new Buffer(16);
			for (var i = 0; i < buf.length; i++) {
				buf[i] = Math.floor(Math.random() * 256);
			}
			var id = buf.toString('base64');
			return id;
		}

		var resetEmail;
		User.find({'basic.email': req.body.email}, function(err, user) {
			resetEmail = user[0].basic.email;
			var emailText = '<h1>Prog Check Password Reset Request</h2>';
			emailText += '<p>Someone has requested a password reset for this email account on progcheck.com</p>';
			emailText += '<p>If this was not you, do not worry. Simply ignore this email and your email and password are secure.</p>';
			emailText += '<p>If this was you, simply follow this link to reset your password</p>';
			emailText += '<p><a href=\"https://progcheck.com/reset/' + token + '\">Reset Password</a></p>';
			emailText += '<p>Thank you for using Prog Check</p>';
			var mailOptions = {
			  from: 'reset.password@progcheck.com',
			  to: resetEmail,
			  subject: 'Password Reset',
			  html: emailText
			};
			transport.sendMail(mailOptions, function(err, info) {
			  if (err) {
			    return console.log(err);
			  }
			});

			res.end();
		});
	});

	router.get('/reset/:idToken', function(req, res) {
	});
};
