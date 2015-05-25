'use strict';

var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var	app = express();

var port = process.env.PORT || 3000;

process.env.APP_SECRET = process.env.APP_SECRET || 'changethischangethischangethis!';

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/progcheck_dev');

app.use(passport.initialize());

require('./lib/passport_strat')(passport);

app.listen(port, function() {
	console.log('Your server is running on port ' + port);
});