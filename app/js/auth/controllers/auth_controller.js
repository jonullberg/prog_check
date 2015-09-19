'use strict';

module.exports = function(app) {
  app.controller('AuthCtrl', ['$scope', '$location', '$modal', 'UserService', 'USStates', 'AuthenticationService', 'Errors', function($scope, $location, $modal, UserService, USStates, AuthenticationService, Errors) {
    $scope.initUser = function() {
      $scope.user = {
        type: 'student',
        usernameText: 'Username',
        passwordText: 'PIN'
      };
    };
    $scope.userChange = function(user) {
      if (user.type === 'student') {
        user.usernameText = 'Username';
        user.passwordText = 'PIN';
      } else if (user.type === 'teacher') {
        user.usernameText = 'Email';
        user.passwordText = 'Password';
      }
    };
    $scope.states = USStates;

    $scope.changeView = function(url) {
      $location.path(url);
    };

    $scope.termsModal = function() {
      $modal.open({
        animation:true,
        templateUrl: '/templates/modals/terms_and_conditions.html',
        size:'lg',
        controller: 'TermsCtrl'
      });
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
