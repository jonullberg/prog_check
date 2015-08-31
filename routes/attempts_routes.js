'use strict';

var Attempt = require('../models/Attempt');
var bodyparser = require('body-parser');

var eatAuth = require('../lib/eat_auth')(process.env.APP_SECRET);
