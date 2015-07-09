'use strict';

module.exports = function(app) {
  app.directive('pcAccountTools', function() {
    var controller = ['$scope', '$cookies', '$location', 'UserService', function($scope, $cookies, $location, UserService) {

      $scope.signedIn = function() {
        return UserService.isSignedIn();
      };

      $scope.displayUsername = function() {
        return $cookies.get('fullName');
      };

      $scope.logOut = function() {
        UserService.logout();
        $location.path('/home');
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
