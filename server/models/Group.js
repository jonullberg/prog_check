'use strict';

var mongoose = require('mongoose');

var groupSchema = mongoose.Schema({
  'name': {
    type: String
  },
  'description': {
    type: String
  },
  'teacherId': {
    type: String
  },
  'students': {
    type: Array
  }
});

module.exports = mongoose.model('Group', groupSchema);
