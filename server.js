'use strict';

var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var	app = express();
var port = process.env.PORT || 3000;
var busboy = require('connect-busboy');

var env = process.env.NODE_ENV || 'development';

var forceSsl = function(req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

app.configure(function() {
  if (env === 'production') {
    app.use(forceSsl);
  }
});
//  Serve up static pages from our build
app.use(express.static(__dirname + '/build'));
app.use(busboy({immediate:true}));


//  Set the application secret to be checked on token confirmation
process.env.APP_SECRET = process.env.APP_SECRET || 'changethischangethischangethis!';

var usersRoutes = express.Router();
var standardsRoutes = express.Router();
var testsRoutes = express.Router();
var studentsRoutes = express.Router();
var bugRoutes = express.Router();

//  The database URI to connect to for saving information
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/progcheck_dev');

app.use(passport.initialize());

require('./lib/passport_strat')(passport);
require('./lib/student_passport_strat')(passport);

require('./routes/user_routes.js')(usersRoutes, passport);
require('./routes/standard_routes.js')(standardsRoutes);
require('./routes/test_routes.js')(testsRoutes);
require('./routes/students_routes.js')(studentsRoutes, passport);
require('./routes/bug_routes.js')(bugRoutes);

app.use('/api', usersRoutes);
app.use('/api', standardsRoutes);
app.use('/api', testsRoutes);
app.use('/api', studentsRoutes);
app.use('/api', bugRoutes);


app.listen(port, function() {
	console.log('Your server is running on port ' + port);
});
