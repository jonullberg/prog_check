'use strict';

module.exports = function(app) {
  app.controller('StandardsListCtrl', ['$scope', '$modal', '$modalInstance', 'dataStore', function($scope, $modal, $modalInstance, dataStore) {
    $scope.standards;
    $scope.getAllStandards = function() {
      dataStore.getStandards(function(err, data) {
        if (err) {
          console.log(err);
        }
        $scope.standards = data;
      });
    };
    $scope.show = function(standard) {
      var controller = ['$scope', '$modalInstance', function($scope, $modalInstance) {
        $scope.buttonText = 'Add This Standard';
        $scope.standard = standard.standard;
        $scope.toggle = function(standard) {
          dataStore.student.goals.push(standard.standard);
          $scope.student = dataStore.student;
          dataStore.saveStudent();
          $modalInstance.close();

        };
      }];
      $modal.open({
        animation: true,
        templateUrl: '/templates/directives/standards/single_standard.html',
        controller: controller,
        size: 'lg',
      });
      $modalInstance.close();
    };
  }]);
};
