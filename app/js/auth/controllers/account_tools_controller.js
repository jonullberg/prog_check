'use strict';

module.exports = function(app) {
  app.controller('AccountToolsCtrl', ['$scope', '$uibModal', '$cookies', '$location', 'UserService', 'AuthenticationService', function($scope, $uibModal, $cookies, $location, UserService, AuthService) {

    $scope.signedIn = function() {
      return UserService.isSignedIn();
    };

    $scope.displayUsername = function() {
      var fullName
      if (AuthService.getUser()) {
        fullName = AuthService.getUser().firstName + ' ' + AuthService.getUser().lastName;
      } else {
        UserService.authToken($cookies.get('token'));
      }
      return fullName;
    };

    $scope.logOut = function() {
      UserService.logout();
      $location.path('/home');
    };

    $scope.changeView = function(view) {
      $location.path(view);
    };

    $scope.bugModal = function() {
      $uibModal.open({
        animation:true,
        templateUrl: '/templates/directives/bug_form.html',
        size:'lg',
        controller: 'BugFormCtrl'
      });
    };

  }]);
};
