'use strict';

module.exports = function(app) {
  app.controller('AdminUserCtrl', ['$scope', '$location', '$cookies', 'UserService', 'AuthenticationService', function($scope, $location, $cookies, UserService, AuthenticationService) {

    $scope.logIn = function(username, password) {
      if (username !== undefined && password !== undefined) {
        UserService.logIn(username, password).success(function(data) {
          AuthenticationService.isLogged = true;
          $cookies.token = data.token;
          $location.path('/admin');
        }).error(function(status, data) {
          console.log(status);
          console.log(data);
        });
      }
    };

    $scope.logOut = function logout() {
      if (AuthenticationService.isLogged) {
        AuthenticationService.isLogged = false;
        delete $cookies.token;
        $location.path('/');
      }
    };
  }]);
};
