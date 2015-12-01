/**
 * A controller for the Admin Goal Form
 * For use in the Prog Check Testing application
 * Created by Jonathan Ullberg on 09/20/2015
 */
'use strict';

export = function(app) {
  app.controller('GoalCtrl', ['$scope', '$uibModalInstance', '$routeParams', 'AdminData', function($scope, $uibModalInstance, $routeParams, AdminData) {
    $scope.save = function(goal) {
      if ($scope.goalForm.$valid) {
        if ($scope.params.formType === 'creating') {
          createGoal(goal);
        } else if ($scope.params.formType === 'editing') {
          updateGoal(goal);
        }
        $uibModalInstance.close();
      }
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss(function() {
        AdminData.Standards.setGoal(null)
      });
    };

    $scope.init = init;

    function init() {
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
