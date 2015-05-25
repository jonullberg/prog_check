'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');

var userSchema = mongoose.Schema({
	'username': { type: String, unique: true, required: '{USERNAME is a required field}' },
	'basic': {
		'email': { type: String, unique: true, required: '{EMAIL is a required field}' },
		'password': { type: String, required: '{PASSWORD is a required field}' }
	}
});

