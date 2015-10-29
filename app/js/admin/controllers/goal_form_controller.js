'use strict';

module.exports = function(app) {
  app.controller('GoalCtrl', ['$scope', '$modalInstance', '$routeParams', 'Errors', 'AdminData', function($scope, $modalInstance, $routeParams, Errors, AdminData) {

    $scope.init = initForm;

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
      $modalInstance.dismiss();
    };

    function initForm() {
      getGoal();
    }

    function getGoal() {
      $scope.goal = AdminData.Standards.getGoal();
    }
    function createGoal(goal) {
      AdminData.Standards.createGoal($routeParams.standardId, goal, function(err, data) {
        if (err) {
          return Errors.addError({
            'msg': 'There was an error creating that goal'
          });
        }
      });
      $scope.goal = null;
    }

    function updateGoal(goal) {
      AdminData.Standards.updateGoal($routeParams.standardId, goal, function(err) {
        if (err) {
          return Errors.addError({
            'msg': 'There was an error updating that goal'
          });
        }
      });
    }
  }]);

};
