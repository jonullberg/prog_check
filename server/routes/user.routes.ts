/**
 * All user routes for the Prog Check API
 * Created by Jonathan Ullberg on 11/23/2015
 */
'use strict';

var usersController = require('./users/controllers/users_controller');
var resetPasswordController = require('./users/controllers/reset_password_controller');

var bodyparser = require('body-parser');
var jwtAuth = require('../lib/jwt_auth')(process.env.APP_SECRET);

export = userRouter;
function userRouter(router, passport) {
  router.use(bodyparser.json());

  // Creates a new user with a username and password
  router.post('/create_user', usersController.createUser);

  // Updates a user by their ID
  router.put('/users/:userId', jwtAuth, usersController.updateUserById);

  // The end point for the user to send their email and password and sign in
  router.get('/sign_in', passport.authenticate('basic', { session: false }), usersController.signInUser);

  // Takes a token and checks that it originates from the server and resends the user to the client
  router.get('/auth_token', jwtAuth, usersController.sendToken);

  // An endpoint for the user to get a new reset password token emailed to them
  router.post('/forgot', resetPasswordController.sendForgotPasswordEmail);

  // Sends form to reset password
  router.get('/reset/:idToken', resetPasswordController.generateResetToken);

  // A user hits this route with their reset token and their email to
  // reset their password. It checks the date to make sure the token
  // has not expired and resets the users email;
  router.post('/reset/:idToken', resetPasswordController.checkResetToken);

  // Gets all users in the DB
  router.get('/users', jwtAuth, usersController.getAllUsers);

};


