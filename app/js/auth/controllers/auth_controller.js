'use strict';

module.exports = function(app) {
  app.controller('authController', ['$scope', '$location', 'auth', function($scope, $location, auth) {

    $scope.errors = [];

    /**
     * Holds title and template URL for directives
     * @type {Array}
     */
    $scope.tabs = [
      {
        title: 'Sign Up',
        url: '../templates/directives/sign_up.html'
      },
      {
        title: 'Sign In',
        url: '../templates/directives/sign_in.html'
      }
    ];

    $scope.currentTab = '../templates/directives/sign_in.html';

    $scope.onClickTab = function(tab) {
      $scope.currentTab = tab.url;
    };

    $scope.isActiveTab = function(tabUrl) {
      return tabUrl === $scope.currentTab;
    };

    $scope.authSubmit = function(user) {
      if(user.passwordConfirmation) {
        if(user.password !== user.passwordConfirmation) {

          console.log('Your password and confirmation do not match');
          return;
        }
        auth.create(user, function(err) {
          if(err)  {
            console.log(err);
            return $scope.errors.push({
              msg: 'Could not sign in'
            });
          }
          $location.path('/dashboard');
        });
      } else {
        auth.signIn(user, function(err) {
          if(err) {
            console.log(err);
            return $scope.errors.push({
              msg: 'Could not sign in'
            });
          }
          $location.path('/dashboard');
        });
      }
    };

  }]);
};
