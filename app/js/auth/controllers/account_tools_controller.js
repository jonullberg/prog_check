'use strict';

module.exports = function(app) {
  app.controller('AccountToolsCtrl', ['$scope', '$modal', '$cookies', '$location', 'UserService', function($scope, $modal, $cookies, $location, UserService) {

    $scope.signedIn = function() {
      return UserService.isSignedIn();
    };

    $scope.displayUsername = function() {
      var fullName = $cookies.getObject('user').firstName + ' ' + $cookies.getObject('user').lastName;
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
      $modal.open({
        animation:true,
        templateUrl: '/templates/directives/bug_form.html',
        size:'lg',
        controller: 'BugFormCtrl'
      });
    };

  }]);
};
