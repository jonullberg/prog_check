'use strict';

module.exports = function(app) {
  app.controller('TestFormCtrl', ['$scope', '$routeParams', '$uibModalInstance', 'AdminData', function($scope, $routeParams, $uibModalInstance, AdminData) {

    $scope.init = init;
    $scope.$on('test:changed', getTest);
    $scope.boolToString = function(arg) {
      return arg ? 'Yes' : 'No';
    }
    $scope.cancel = function(test) {
      $uibModalInstance.dismiss();
    };
    $scope.save = function(test) {
      test.standardId = $routeParams.standardId;
      if ($scope.params.formType === 'editing') {
        updateTest(test);
      } else if ($scope.params.formType === 'creating') {
        createTest(test);
      }
      $uibModalInstance.close();
    };

    function init() {
      getTest();
      getStandard();
    }

    function getTest() {
      if ($scope.params.formType === 'editing') {
        if (!AdminData.Tests.getTest()) {
          AdminData.Tests.fetchTest($routeParams.testId);
        }
        $scope.test = AdminData.Tests.getTest();
        $scope.test._goal = $scope.test.goalId;
        return;
      }
      $scope.test = AdminData.Tests.getTest();
    }
    function getStandard() {
      $scope.standard = AdminData.Standards.getStandard();
    }
    function updateTest(test) {
      AdminData.Tests.updateTest(test);
    };

    function createTest(test) {
      AdminData.Tests.createTest(test);
    }

  }]);
};
