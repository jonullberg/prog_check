/**
 * A Controller to deal with the students goal list
 */
'use strict';

module.exports = function(app) {
  app.controller('StudentGoalsListCtrl', ['$scope', '$rootScope', '$modal', 'TeacherData', function studentGoalsListCtrl($scope, $rootScope, $modal, TeacherData) {

    $scope.removeGoal = function(goal) {
      TeacherData.Students.removeGoal(goal);
    };

    $scope.showButtons = function(goal) {
      goal.buttonsShowing = !goal.buttonsShowing;
    };
    $scope.editStudentGoal = editStudentGoal;


    function editStudentGoal(goal) {
      var scope = $rootScope.$new();
      scope.params = {
        buttonText: 'Update Goal',
        formType: 'editing'
      };
      scope.student = $scope.student;
      scope.goal = goal;
      $modal.open({
        animation:true,
        templateUrl: '/templates/teacher/student_goal_settings.html',
        size:'lg',
        controller: 'StudentGoalSettingsCtrl',
        scope: scope

      });
    }
}]);
};


