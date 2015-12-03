'use strict';

var mongoose = require('mongoose');

var logSchema = mongoose.Schema({
  'source': String,
  'errorUrl': String,
  'errorMessage': String,
  'stackTrace': String,
  'cause': String,
});

module.exports = mongoose.model('Log', logSchema);
