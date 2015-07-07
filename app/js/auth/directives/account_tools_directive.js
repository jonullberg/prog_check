'use strict';

module.exports = function(app) {
  app.directive('pcAccountTools', function() {
    var controller = ['$scope', '$cookies', '$location', 'auth', function($scope, $cookies, $location, auth) {

      $scope.signedIn = function() {
        return auth.isSignedIn();
      };

      $scope.displayUsername = function() {
        return $cookies.get('username');
      };

      $scope.logOut = function() {
        auth.logout();
        $location.path('/home');
        $scope.getHeaders();
      };

      $scope.changeView = function(view) {
        $location.path(view);
      };

    }];
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/account_tools.html',
      scope: {
        getHeaders: '&'
      },
      controller: controller

    };
  });

};
