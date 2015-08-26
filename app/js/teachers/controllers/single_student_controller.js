'use strict';

module.exports = function(app) {
  app.controller('SingleStudentCtrl', ['$scope', '$routeParams', '$modal', '$location', '$rootScope', 'Errors', 'Students', function($scope, $routeParams, $modal, $location, $rootScope, Errors, Students) {

    var getStudent = function() {
      $scope.student = Students.student;
    };


    $scope.toggleDelete = function() {
      $scope.isDeleteShown = !$scope.isDeleteShown;
    };

    $scope.deleteStudent = function(student) {
      Students.deleteStudent(student, function(err) {
        if (err) {
          return Errors.addError({
            'msg': 'There was an error deleting that student'
          });
        }

        $location.path('/teacher/students');
      });
    };

    $scope.$on('student:changed', getStudent);

    $scope.getStudent = function() {
      getStudent();
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
        size: 'lg',
        controller: 'StandardsListModalCtrl'
      });
    };

    $scope.showButtons = function(goal) {
      goal.buttonsShowing = !goal.buttonsShowing;
    };

    $scope.saveStudent = function(student) {
      student.numberOfQuestions = $scope.selectedNumber;
      Students.saveStudent(student, function(err, data) {
        if (err) {
          return Errors.addError({
            'msg': 'There was an error updating that student'
          });
        }
      });
      $location.path('/teacher/students');
    };

    $scope.editStudentModal = function(student) {
      Students.student = student;
      var scope = $rootScope.$new();
      scope.params = {
        formType: 'editing',
        buttonText: 'Save Student'
      };
      $modal.open({
        animation:true,
        templateUrl: '/templates/directives/teachers/student_form.html',
        size:'lg',
        controller: 'StudentFormCtrl',
        scope: scope
      })
    };
  }]);
};
