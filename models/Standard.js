'use strict';

var mongoose = require('mongoose');

var goalSchema = mongoose.Schema({
  'name': {
    type: String
  },
  'description': {
    type: String
  }
});

var standardSchema = mongoose.Schema({
  'name': {
    type: String,
    required: true
  },
  'gradeName': {
    type: String,
    required: true
  },
  'shortGrade': {
    type: String,
    required: true
  },
  'code': {
    type: String,
    required: true
  },
  'language': {
    type: String
  },
  'domain': {
    type: Array
  },
  'goals': [goalSchema]
});

module.exports = mongoose.model('Standard', standardSchema);
