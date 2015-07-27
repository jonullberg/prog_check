'use strict';

module.exports = function(app) {
  app.controller('TestFormCtrl', ['$scope', '$modalInstance', 'Tests', 'dataStore', 'Errors', function($scope, $modalInstance, Tests, dataStore, Errors) {

    $scope.standard = dataStore.standard;

    $scope.setGoal = function(test) {
      test._goal = test.goalId;
      if (!test) {
        test = {};
      }
    };

    $scope.cancel = function(test) {
      angular.copy(dataStore.masterTest, test);
      $scope.setGoal(test);
      if ($scope.isTestFormShowing) {
        $scope.toggleTestForm();
      }
    };

    $scope.save = function(test) {
      test.standardId = dataStore.standard._id;
      Tests.setTest(test);
      $modalInstance.close();
      Tests.createTest(test, function(err, data) {
        if (err) {
          return Errors.addError({
            'msg': 'Failed to create test'
          });
        }
      })
    };
  }]);
};
