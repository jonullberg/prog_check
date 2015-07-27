'use strict';

module.exports = function(app) {
  app.controller('StandardsListCtrl', ['$scope', '$modal', 'dataStore', function($scope, $modal, dataStore) {
    $scope.standards;
    var updateStandards = function() {
      $scope.standards = dataStore.standards;
    };
    $scope.$on('standards:changed', updateStandards);

    $scope.getAllStandards = function() {
      if (dataStore.standards.length) {
        updateStandards();
      } else {
        dataStore.getStandards(function(err, data) {
          if (err) {
            Errors.addError({
              'msg': 'Failed to get any standards'
            });
          }
          updateStandards();

        });
      }
    };



    /**
     * Opens modal with ability to add a new standard
     */
    $scope.addStandard = function() {
      var controller = ['$scope', '$modalInstance', function($scope, $modalInstance) {
        // Need to add functionality to add standard
      }];
      $modal.open({
        animation:true,
        templateUrl: '/templates/directives/standards/standard_form.html',
        size: 'lg',
        controller: controller
      });
    };

    $scope.select = function(standard) {
      dataStore.setStandard(standard);
      $scope.show({standard: standard});
    };
  }]);
};
