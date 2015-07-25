'use strict';

module.exports = function(app) {
  app.controller('mainController', ['$scope', '$location', '$modal', 'AuthenticationService', function($scope, $location, $modal, AuthenticationService) {
    $scope.changeView = function(url) {
      $location.path(url);

    };

    $scope.$on('errors:changed', function() {
      $modal.open({
        animation: true,
        templateUrl: '/templates/directives/errors.html',
        controller: 'ErrorsCtrl',
        size: 'lg'
      });
    });
  }]);
};

