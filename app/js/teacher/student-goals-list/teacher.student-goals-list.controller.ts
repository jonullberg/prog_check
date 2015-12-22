/**
 * A Controller to deal with the students goal list
 */
module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .controller('StudentGoalsListCtrl', ['$scope', '$rootScope', '$routeParams', '$uibModal', 'TeacherData', studentGoalsListCtrl])

  function studentGoalsListCtrl($scope, $rootScope, $routeParams, $uibModal, TeacherData) {

    $scope.$on('student:changed', getStudent);
    $scope.$on('attempts:changed', getAttempts);

    // Public Functions
    var sgl = this;
    sgl.isGoalAlertShown = false;
    sgl.init = function() {
      getStudent();
    };
    sgl.showAttempts = function(goal) {
      var original = goal.isOpen;
      sgl.student.goals.forEach(function(goal) {
        goal.isOpen = false;
      });
      console.log(goal);
      console.log(sgl.student.goals);
      goal.isOpen = !original;
      TeacherData.Attempts.fetchAttemptsByGoal($routeParams.studentId, goal.goalId);
    };
    sgl.deleteGoal = function(goal) {
      TeacherData.Students.deleteGoal($routeParams.studentId, goal.goalId);
      toggleGoalAlert(null);
    };

    sgl.toggleGoalAlert = toggleGoalAlert;

    sgl.showButtons = function(goal) {
      var showing = goal.buttonsShowing;
      sgl.student.goals.forEach(function(goal) {
        goal.buttonsShowing = false;
      });
      goal.buttonsShowing = !showing;
    };

    sgl.editStudentGoal = function(goal) {
      var scope = $rootScope.$new();
      scope.params = {
        buttonText: 'Update Goal',
        formType: 'editing'
      };
      scope.student = $scope.student;
      TeacherData.Students.setGoal(goal);
      $uibModal.open({
        animation: true,
        templateUrl: '/templates/teacher/student-goal-settings.html',
        size: 'lg',
        controller: 'StudentGoalSettingsCtrl',
        controllerAs: 'sgs',
        scope: scope

      });
    };

    // Private Functions
    function getAttempts() {
      sgl.attempts = TeacherData.Attempts.getAttempts();
    }

    function getStudent() {
      if (!TeacherData.Students.getStudent()) {
        TeacherData.Students.fetchStudent($routeParams.studentId);
      }
      sgl.student = TeacherData.Students.getStudent();
    }

    function toggleGoalAlert(goal) {
      console.log('toggle');
      if (sgl.isGoalAlertShown) {
        sgl.isGoalAlertShown = false;
      } else {
        sgl.isGoalAlertShown = true;
      }
      sgl.goal = goal;
    }

  }
}
