'use strict';

var config = require('./lib/config_variables');
var path = require('path');
var mongoose = require('mongoose');
var express = require('express');
var passport = require('passport');
var	app = express();
var port = process.env.PORT || config.port;
var busboy = require('connect-busboy');
var env = process.env.NODE_ENV || 'DEVELOPMENT';

// Winston Logging
var winston = require('winston');
var MongoDB = require('winston-mongodb').MongoDB;
var PaperTrail = require('winston-papertrail').Papertrail;


// Redirect requests to https if in Production mode
var forceSsl = function(req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

if (env === 'test') {
  port = 3002;
}
if (env === 'production') {
  // Add Winston Transports
  winston.add(MongoDB, {
    level: 'info',
    db: process.env.MONGOLAB_URI || 'mongodb://localhost/progcheck_dev'
  });

  winston.add(PaperTrail, {
    host: 'logs3.papertrailapp.com',
    port: 32135
  });

  app.use(forceSsl);
}

//  Serve up static pages from our build
app.use(express.static(__dirname + '/../build'));
app.use(busboy({immediate:true}));

//  Set the application secret to be checked on token confirmation
process.env.APP_SECRET = process.env.APP_SECRET || config.secret;

// Create routers
var userRoutes = express.Router();
var standardRoutes = express.Router();
var testRoutes = express.Router();
var studentRoutes = express.Router();
var bugRoutes = express.Router();
var attemptRoutes = express.Router();

//  The database URI to connect to for saving information
mongoose.connect(process.env.MONGOLAB_URI || config.database);

app.use(passport.initialize());
require('./lib/passport_strat')(passport);
require('./lib/student_passport_strat')(passport);

// Initialize routes
require('./routes/user.routes.js')(userRoutes, passport);
require('./routes/standard.routes.js')(standardRoutes);
require('./routes/test.routes.js')(testRoutes);
require('./routes/student.routes.js')(studentRoutes, passport);
require('./routes/bug.routes.js')(bugRoutes);
require('./routes/attempt.routes.js')(attemptRoutes);

// Use prefixes for routes
app.use('/api', userRoutes);
app.use('/api', standardRoutes);
app.use('/api', testRoutes);
app.use('/api', studentRoutes);
app.use('/api', bugRoutes);
app.use('/api', attemptRoutes)

app.listen(port, function() {
	console.log('Your server is running on port ' + port);
});
