'use strict';

var mongoose = require('mongoose');

var testSchema = mongoose.Schema({
  'standardId': {
    type: String
  },
  'questions': {
    type: Array,

  }

})
