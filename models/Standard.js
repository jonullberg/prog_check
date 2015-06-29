'use strict';

var mongoose = require('mongoose');

var standardSchema = mongoose.Schema({
  'name': {
    type: String,
    required: true
  },
  'grade': {
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
  'keywords': {
    type: Array
  },
  'description': {
    type: String
  }
});

module.exports = mongoose.model('Standard', standardSchema);
