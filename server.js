'use strict';

var config = require('./lib/config_variables');

var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var	app = express();
var port = process.env.PORT || config.port;
var busboy = require('connect-busboy');

var winston = require('winston');
var MongoDB = require('winston-mongodb').MongoDB;
var PaperTrail = require('winston-papertrail').Papertrail
winston.add(MongoDB, {
  level: 'info',
  db: process.env.MONGOLAB_URI || 'mongodb://localhost/progcheck_dev'
});
winston.add(PaperTrail, {
  host: 'logs3.papertrailapp.com',
  port: 32135
});

var env = process.env.NODE_ENV || 'DEVELOPMENT';

var forceSsl = function(req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

if (env === 'PRODUCTION') {
  app.use(forceSsl);
}

//  Serve up static pages from our build
app.use(express.static(__dirname + '/build'));
app.use(busboy({immediate:true}));

//  Set the application secret to be checked on token confirmation
process.env.APP_SECRET = process.env.APP_SECRET || config.secret;

var usersRoutes = express.Router();
var standardsRoutes = express.Router();
var testsRoutes = express.Router();
var studentsRoutes = express.Router();
var bugsRoutes = express.Router();
var attemptsRoutes = express.Router();

//  The database URI to connect to for saving information
mongoose.connect(process.env.MONGOLAB_URI || config.database);

app.use(passport.initialize());

require('./lib/passport_strat')(passport);
require('./lib/student_passport_strat')(passport);

require('./routes/routes.users.js')(usersRoutes, passport);
require('./routes/routes.standards.js')(standardsRoutes);
require('./routes/routes.tests.js')(testsRoutes);
require('./routes/routes.students.js')(studentsRoutes, passport);
require('./routes/routes.bugs.js')(bugsRoutes);
require('./routes/routes.attempts.js')(attemptsRoutes);

app.use('/api', usersRoutes);
app.use('/api', standardsRoutes);
app.use('/api', testsRoutes);
app.use('/api', studentsRoutes);
app.use('/api', bugsRoutes);
app.use('/api', attemptsRoutes)

app.listen(port, function() {
	console.log('Your server is running on port ' + port);
});
