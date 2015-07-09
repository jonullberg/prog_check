'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var eat = require('eat');

var userSchema = mongoose.Schema({
  'role': {
    type: String,
    required: true
  },
	'username': {
		type: String,
		unique: true,
		required: '{USERNAME is a required field}'
	},
	'basic': {
		'email': {
			type: String,
			unique: true,
			required: '{EMAIL is a required field}'
		},
		'password': {
			type: String,
			required: '{PASSWORD is a required field}'
		}
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
	eat.encode({id: this._id}, secret, callback);
};

userSchema.methods.checkPassword = function(password, callback) {
  bcrypt.compare(password, this.basic.password, function(err, result) {
    if (err) {
      console.log(err);
      return console.log('could not authenticate password');
    }

    callback(null, result);
  });
};

userSchema.pre('validate', function(next) {
  var adminUsers = ['krisular', 'jonullberg'];
  if (adminUsers.indexOf(this.username) !== -1) {
    this.role = 'admin';
  } else {
    this.role = 'teacher';
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
