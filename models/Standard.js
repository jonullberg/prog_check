'use strict';

var mongoose = require('mongoose');

var standardSchema = mongoose.Schema({
  'name': {
    type: String
  },
  'grade': {
    type: String
  },
  'code': {
    type: String
  },
  'language': {
    type: String
  },
  'keywords': {
    type: Array
  }
});

module.exports = mongoose.model('Standard', standardSchema);
