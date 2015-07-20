'use strict';

var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
  'firstName': {
    type: String,
    required: true
  },
  'lastName': {
    type: String,
    required: true
  },
  'username': {
    type: String,
    required: true
  },
  'pin': {
    type: String,
    required: true
  },
  'teacherId': {
    type: String,
    required: true
  },
  'goals': {
    type: Array
  }
});

studentSchema.pre('validate', function(next) {
  var doc = this;
  if (doc.userName === undefined) {
    var username = doc.firstName.slice(0, 1).toLowerCase() + doc.lastName.toLowerCase();
    doc.username = username;
    next();
  }
})

module.exports = mongoose.model('Student', studentSchema);
