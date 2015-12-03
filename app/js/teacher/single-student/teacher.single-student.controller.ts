'use strict';

export = function(app) {
  app.controller('SingleStudentCtrl', ['$scope', '$routeParams', '$uibModal', '$location', '$rootScope', '$sce', 'TeacherData', function($scope, $routeParams, $uibModal, $location, $rootScope, $sce, TeacherData) {

    $scope.init = init;
    $scope.trustAsHtml = $sce.trustAsHtml;

    $scope.$on('student:changed', getStudent);

    $scope.goBack = function() {
      TeacherData.Students.setStudent(null);
      TeacherData.Attempts.setAttempts(null);
      $location.path('teacher/'+ $routeParams.teacherId + '/students');
    };

    $scope.openGoalForm = function() {
      $uibModal.open({
        animation: true,
        templateUrl: '/templates/directives/standards/standards_list.html',
        size: 'lg',
        controller: 'StandardsListModalCtrl'
      });
    };

    $scope.editStudentModal = function(student) {
      TeacherData.Students.setStudent(student);
      var scope = $rootScope.$new();
      scope.params = {
        formType: 'editing',
        buttonText: 'Save Student'
      };
      $uibModal.open({
        animation:true,
        templateUrl: '/templates/directives/teachers/student_form.html',
        size:'lg',
        controller: 'StudentFormCtrl',
        scope: scope
      });
    };

    function init() {
      getStudent();
    }

    function getStudent() {
      if (!TeacherData.Students.getStudent()) {
        TeacherData.Students.fetchStudent($routeParams.studentId);
      }
      $scope.student = TeacherData.Students.getStudent();
    }

  }]);
};

