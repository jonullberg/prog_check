'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
// var eat = require('eat');
var jwt = require('jsonwebtoken');

var userSchema = mongoose.Schema({
  'basic': {
    'email': {
      type: String,
      unique: true,
      required: '{EMAIL is a required field}'
    },
    'password': {
      type: String,
      required: '{PASSWORD is a required field}'
    },
    'tokenExpiration': {
      type: Date
    }
  },
  'role': {
    type: String,
    required: true
  },
  'firstName': {
    type: String,
    required: true
  },
  'lastName': {
    type: String,
    required: true,
  },
  'school': {
    'schoolName': {
      type: String
    },
    'schoolState': {
      type: String
    },
    'schoolDistrict': {
      type: String
    }
  },
  'reset': {
    'resetToken': {
      type: String
    },
    'expiration': {
      type: Date
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
  var user = {
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.basic.email,
    school: this.school,
    role: this.role,
    _id: this._id
  };
	jwt.sign({}, secret, {
    expiresIn: "7d",
    subject: user,
    issuer: 'progcheck'
  }, callback);
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
  var adminUsers = [
    'jonathan@example.com',
    'krisula@example.com',
    'leah@progcheck.com',
    'jonathan.ullberg@gmail.com'
  ];
  if (adminUsers.indexOf(this.basic.email) !== -1) {
    this.role = 'admin';
  } else {
    this.role = 'teacher';
  }
  next();
});

module.exports = mongoose.model('User', userSchema);
