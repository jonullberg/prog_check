'use strict';

module.exports = function(app) {
  app.controller('IndexCtrl', ['$scope', '$location', '$modal', function($scope, $location, $modal) {
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

