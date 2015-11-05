'use strict';

module.exports = function(app) {
  app.controller('IndexCtrl', ['$scope', '$location', '$uibModal', function($scope, $location, $uibModal) {
    $scope.changeView = function(url) {
      $location.path(url);
    };

    $scope.$on('errors:changed', function() {
      $uibModal.open({
        animation: true,
        templateUrl: '/templates/directives/errors.html',
        controller: 'ErrorsCtrl',
        size: 'lg'
      });
    });
  }]);
};

