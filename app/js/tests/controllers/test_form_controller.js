'use strict';

module.exports = function(app) {
  app.controller('testFormCtrl', ['$scope', 'dataStore', function($scope, dataStore) {

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

  }]);
};
