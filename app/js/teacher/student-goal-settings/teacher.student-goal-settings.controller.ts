/**
 * A controller to deal with the view that edits a single students selected goal
 */

module ProgCheck {
  'use strict';
  angular
    .module('progCheck')
    .controller('StudentGoalSettingsCtrl', ['$scope', '$uibModalInstance', '$routeParams', 'TeacherData', studentGoalSettingsCtrl])

  function  studentGoalSettingsCtrl($scope, $uibModalInstance, $routeParams, TeacherData) {

    $scope.$on('goal:changed', getGoal);

    // Public Functions
    var sgs = this;
    sgs.init = function() {
      getGoal();
    };
    sgs.save = function(goal) {
      if ($scope.params.formType === 'editing') {
        updateGoal(goal);
      } else if ($scope.params.formType === 'creating') {
        createGoal(goal);
      }
      $uibModalInstance.close();
    };
    sgs.cancel = function() {
      $uibModalInstance.dismiss();
    };

    // Private Functions
    function getGoal() {
      sgs.goal = TeacherData.Students.getGoal();
    }
    function updateGoal(goal) {
      TeacherData.Students.updateGoal($routeParams.studentId, goal);
    }

    function createGoal(goal) {
      TeacherData.Students.createGoal($routeParams.studentId, goal);
    }
  }
}

