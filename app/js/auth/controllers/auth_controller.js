'use strict';

module.exports = function(app) {
  app.controller('authController', ['$scope', '$location', 'UserService', 'USStates', 'AuthenticationService', function($scope, $location, UserService, USStates, AuthenticationService) {

    $scope.errors = [];

    $scope.states = USStates;

    $scope.changeView = function(url) {
      $location.path(url);
    };

    $scope.authSubmit = function(user) {
      if(user.passwordConfirmation) {
        if(user.password !== user.passwordConfirmation) {

          console.log('Your password and confirmation do not match');
          return;
        }
        UserService.create(user, function(err) {
          if(err)  {
            console.log(err);
            return $scope.errors.push({
              msg: 'Could not sign in'
            });
          }
          $location.path('/home');
        });
      } else {
        UserService.signIn(user, function(err) {
          if(err) {
            console.log(err);
            return $scope.errors.push({
              msg: 'Could not sign in'
            });
          }
          $location.path('/home');
        });
      }
    };

  }]);
};
