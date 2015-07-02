'use strict';

var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var	app = express();
var port = process.env.PORT || 3000;

//  Serve up static pages from our build
app.use(express.static(__dirname + '/build'));

//  Set the application secret to be checked on token confirmation
process.env.APP_SECRET = process.env.APP_SECRET || 'changethischangethischangethis!';

var usersRoutes = express.Router();
var standardsRoutes = express.Router();
var testsRoutes = express.Router();

//  The database URI to connect to for saving information
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/progcheck_dev');

app.use(passport.initialize());

require('./lib/passport_strat')(passport);

require('./routes/user_routes.js')(usersRoutes, passport);
require('./routes/standard_routes.js')(standardsRoutes);
require('./routes/test_routes.js')(testsRoutes)

app.use('/api', usersRoutes);
app.use('/api', standardsRoutes);
app.use('/api', testsRoutes);

app.listen(port, function() {
	console.log('Your server is running on port ' + port);
});
