'use strict';

module.exports = function(app) {
  app.controller('SingleStudentCtrl', ['$scope', '$routeParams', '$modal', '$location', 'Errors', 'Students', function($scope, $routeParams, $modal, $location, Errors, Students) {
    $scope.student;
    $scope.getStudent = function() {
      var id = $routeParams.studentId;
      Students.getStudent(id, function(err, data) {
        if (err) {
          return Errors.addError({
            'msg': 'There was an error getting student'
          });
        }
      });
    };

    $scope.goBack = function() {
      Students.student = null;
      $location.path('teacher/students');
    };

    $scope.removeGoal = function(goal) {
      Students.removeGoal(goal);
    };

    $scope.openGoalForm = function() {
      $modal.open({
        animation: true,
        templateUrl: '/templates/directives/standards/standards_list.html',
        controller: 'StandardsListCtrl',
        size: 'lg'
      });
    };

  }]);
};
