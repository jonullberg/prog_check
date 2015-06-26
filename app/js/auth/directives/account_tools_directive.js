'use strict';

module.exports = function(app) {
  app.directive('pcAccountTools', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/pc_account_tools.html',
      controller: ['$scope', '$cookies', '$location', 'auth', function($scope, $cookies, $location, auth) {

        $scope.signedIn = function() {
          return auth.isSignedIn();
        };

        $scope.displayUsername = function() {
          return $cookies.get('username');
        };

        $scope.logOut = function() {
          auth.logout();
          $location.path('/home');
        };

        $scope.changeView = function(view) {
          $location.path(view);
        };

      }]

    };
  });

};
