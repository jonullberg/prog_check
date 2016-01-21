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
    type: Schema.Type.ObjectId
  },
  'students': {
    type: Array
  }
});

module.exports = mongoose.model('Group', groupSchema);
