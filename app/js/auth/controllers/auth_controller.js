'use strict';

module.exports = function(app) {
  app.controller('AuthCtrl', ['$scope', '$location', 'UserService', 'USStates', 'AuthenticationService', 'Errors', function($scope, $location, UserService, USStates, AuthenticationService, Errors) {

    $scope.errors = [];

    $scope.states = USStates;

    $scope.changeView = function(url) {
      $location.path(url);
    };

    $scope.authSubmit = function(user) {
      if(user.passwordConfirmation) {
        if(user.password !== user.passwordConfirmation) {
          return Errors.addError({
            'msg': 'Your password and confirmation do not match'
          });
        }
        UserService.create(user, function(err) {
          if (err)  {
            return Errors.addError({
              'msg': 'Could not sign in'
            });
          }
          $location.path('/home');
        });
      } else {
        UserService.signIn(user, function(err) {
          if (err) {
            return Errors.addError({
              'msg': 'Could not sign in'
            });
          }
          $location.path('/home');
        });
      }
    };

  }]);
};
