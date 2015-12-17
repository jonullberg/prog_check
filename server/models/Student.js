/**
 * The data structure for a student
 */
'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');

var goalSchema = mongoose.Schema({
  'goalId': {
    type: String
  },
  'numberOfQuestions': {
    type: Number
  },
  'priority': {
    type: Number
  },
  'dateLastTaken': {
    type: Date
  },
  'active': {
    type: Boolean
  }
}, {
  _id: false
});

var studentSchema = mongoose.Schema({
  'firstName': {
    type: String,
    required: true
  },
  'lastName': {
    type: String,
    required: true
  },
  'basic': {
    'username': {
      type: String
    },
    'pin': {
      type: String,
      required: true
    }
  },
  'groupId': {
    type: String
  },
  'teacherId': {
    type: String,
    required: true
  },
  'goals': [goalSchema],
  'numberOfQuestions': {
    type: Number
  },
  'role': {
    type: String
  },
  'goalPriority': {
    type: String
  },
  'archivedGoals': {
    type: Array
  }
});

studentSchema.pre('save', function(next) {
  var doc = this;
  var userName = doc.firstName.slice(0,1).toLowerCase() + doc.lastName.slice(0, 5).toLowerCase();
  var num = 1;
  if (!doc.basic.username) {
    var uniqueSearch = function(username) {
    mongoose.models.Student.findOne({
      'basic.username': username + num
    }, function(err, results) {
      if (err) {
        console.log('There was an error');
        next();
      } else if (results) {
        num++;
        return uniqueSearch(username);
      } else {
        doc.basic.username = username + num;
        next();
      }
    });
  };
  uniqueSearch(userName);
  }
});

studentSchema.pre('save', function(next) {
  var doc = this;
  doc.role = 'student';
  next();
});

studentSchema.methods.generateHash = function(password, callback) {
  bcrypt.genSalt(8, function(err, salt) {
    bcrypt.hash(password, salt, null, function(err, hash) {
      return callback(err, hash);
    });
  });
};

studentSchema.methods.generateToken = function(secret, callback) {
  var user = this;
  delete user.basic.pin;
  jwt.sign({}, secret, {
    expiresIn: '1d',
    subject: user,
    issuer: 'progcheck'
  }, callback);
};

studentSchema.methods.checkPin = function(pin, callback) {
  if (pin !== this.basic.pin) {
    var err = new Error('That pin does not match');
    return callback(err);
  }
  return callback(null, pin);
};

module.exports = mongoose.model('Student', studentSchema);
