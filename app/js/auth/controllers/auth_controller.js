'use strict';

module.exports = function(app) {
  app.controller('AuthCtrl', ['$scope', '$location', '$modal', 'UserService', 'USStates', 'AuthenticationService', 'Errors', function($scope, $location, $modal, UserService, USStates, AuthenticationService, Errors) {

    console.log($scope.user);
    $scope.errors = [];

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
    $scope.pwdValidationText = 'Your password should: '
    $scope.pwdValidationWarnings = {
      'length': {
        'className': 'red',
        'warning': 'be between 8 and 16 characters'
      },
      'capital': {
        'className': 'red',
        'warning': 'contain a capital letter'
      },
      'lower':{
        'className': 'red',
        'warning':'contain a lowercase letter'
      },
      'number': {
        'className': 'red',
        'warning':'contain a number'
      },
      'matches': {
        'className': 'red',
        'warning': 'match the password confirmation.'
      }
    };
    $scope.authSubmit = function(user) {
      if ($scope.signUpForm.$valid) {
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

      } else {
        alert('You\'re form is invalid');
      }
    };

  }]);
};
