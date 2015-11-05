'use strict';

module.exports = function(app) {
  app.controller('GoalCtrl', ['$scope', '$modalInstance', '$routeParams', 'AdminData', function($scope, $modalInstance, $routeParams, AdminData) {

    $scope.save = function(goal) {
      if ($scope.goalForm.$valid) {
        if ($scope.params.formType === 'creating') {
          createGoal(goal);
          $modalInstance.close();
        } else if ($scope.params.formType === 'editing') {
          updateGoal(goal);
          $modalInstance.close();
        }
      }
    };

    $scope.cancel = function() {
      $modalInstance.dismiss(function() {
        AdminData.Standards.setGoal(null)
      });
    };

    $scope.init = initForm;

    function initForm() {
      getGoal();
    }

    function getGoal() {
      $scope.goal = AdminData.Standards.getGoal();
    }
    function createGoal(goal) {
      AdminData.Standards.createGoal($routeParams.standardId, goal, function(err, data) {
        AdminData.Standards.setGoal(null);
      });
    }

    function updateGoal(goal) {
      AdminData.Standards.updateGoal($routeParams.standardId, goal, function(err) {
        AdminData.Standards.setGoal(null);
      });
    }
  }]);

};
