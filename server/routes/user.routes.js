'use strict';
var usersController = require('./users/controllers/users_controller');
var resetPasswordController = require('./users/controllers/reset_password_controller');
var bodyparser = require('body-parser');
var jwtAuth = require('../lib/jwt_auth')(process.env.APP_SECRET);
function userRouter(router, passport) {
    router.use(bodyparser.json());
    router.post('/create_user', usersController.createUser);
    router.put('/users/:userId', jwtAuth, usersController.updateUserById);
    router.get('/sign_in', passport.authenticate('basic', { session: false }), usersController.signInUser);
    router.get('/auth_token', jwtAuth, usersController.sendToken);
    router.post('/forgot', resetPasswordController.sendForgotPasswordEmail);
    router.get('/reset/:idToken', resetPasswordController.generateResetToken);
    router.post('/reset/:idToken', resetPasswordController.checkResetToken);
    router.get('/users', jwtAuth, usersController.getAllUsers);
}
;
module.exports = userRouter;
