'use strict';

module.exports = function(app) {
  app.controller('standardsListCtrl', ['$scope', '$modal', '$modalInstance', 'dataStore', function($scope, $modal, $modalInstance, dataStore) {
    $scope.standards = dataStore.standards;
    $scope.getAllStandards = function() {
      dataStore.getStandards(function(err, data) {
        if (err) {
          console.log(err);
        }
        $scope.standards = data;
      });
    };
    $scope.show = function(standard) {
      $modal.open({
        animation: true,
        templateUrl: '/templates/directives/standards/single_standard.html',
        controller: 'standardsCtrl',
        size: 'lg',
        resolve: {
          standard: function() {
            return standard.standard;
          }
        }
      });
      $modalInstance.close()
    };
  }]);
};
