'use strict';

module.exports = function(app) {
  app.controller('ErrorsCtrl', ['$scope', '$uibModalInstance', 'Errors', function ($scope, $uibModalInstance, Errors) {
    $scope.errors = Errors.errors;
    $scope.testFn = function() {
      console.log($scope.errors);
    };
    $scope.removeError = function(error) {
      $scope.errors.slice($scope.errors.indexOf(error), 1);
      Errors.removeError(error);
    };

    $scope.close = function() {
      $uibModalInstance.close();
    };
  }]);
};
