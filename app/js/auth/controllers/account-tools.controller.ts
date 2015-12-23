module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .controller('AccountToolsCtrl', ['$scope', '$uibModal', '$location', 'UserService', 'AuthenticationService', accountToolsCtrl])

  function accountToolsCtrl($scope, $uibModal, $location, UserService, Auth) {

    $scope.$on('user:changed', getUsername);
    $scope.signedIn = function() {
      return Auth.user;
    };
    $scope.init = init;

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
    function init() {
      getUsername();
    }
    function getUsername() {
      var username;
      if (Auth.getUser()) {
        username = Auth.getUser().firstName + ' ' + Auth.getUser().lastName;

      }
      $scope.displayUsername = username;
    }
  }
}
