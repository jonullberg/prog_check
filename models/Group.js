'use strict';

var mongoose = require('mongoose');

var groupSchema = mongoose.Schema({
  'name': {
    type: String
  },
  'students': {
    type: Array
  }
});

module.exports = mongoose.model('Group', groupSchema);
