'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');

var userSchema = mongoose.Schema({
	'email': { type: String, unique: true, required: '{EMAIL is a required field}' },
	'basic': {
		'username': { type: String, unique: true, required: '{USERNAME is a required field}' },
		'password': { type: String, required: '{PASSWORD is a required field}' }
	}
});

userSchema.methods.generateHash = function(password, callback) {
	bcrypt.genSalt(8, function(err, salt) {
		bcrypt.hash(password, salt, null, function(err, hash) {
			return callback(err, hash);
		});
	});
};

userSchema.methods.generateToken = function(secret, callback) {
	eat.encode({ id: this._id }, secret, callback);
};

module.exports = mongoose.model('User', userSchema);