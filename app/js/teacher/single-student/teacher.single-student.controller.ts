module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .controller('SingleStudentCtrl', ['$scope', '$routeParams', '$uibModal', '$location', '$rootScope', '$sce', 'TeacherData', singleStudentCtrl])

  function singleStudentCtrl($scope, $routeParams, $uibModal, $location, $rootScope, $sce, TeacherData) {
    $scope.$on('student:changed', getStudent);

    // Public Methods
    var ss = this;
    ss.init = function() {
      TeacherData.Students.fetchStudent($routeParams.studentId, function(err, data) {
        ss.student = data.student;
      });
    };
    ss.trustAsHtml = $sce.trustAsHtml;

    ss.goBack = function() {
      TeacherData.Students.setStudent(null);
      TeacherData.Attempts.setAttempts(null);
      $location.path('teacher/'+ $routeParams.teacherId + '/students');
    };

    ss.openGoalForm = function() {
      $uibModal.open({
        animation: true,
        templateUrl: '/templates/admin/standards-list.html',
        size: 'lg',
        controller: 'StandardsListModalCtrl',
        controllerAs: 'sl'
      });
    };

    ss.editStudentModal = function(student) {
      TeacherData.Students.setStudent(student);
      var scope = $rootScope.$new();
      scope.params = {
        formType: 'editing',
        buttonText: 'Save Student'
      };
      $uibModal.open({
        animation:true,
        templateUrl: '/templates/teacher/student-form.html',
        size:'lg',
        controller: 'StudentFormCtrl',
        controllerAs: 'sf',
        scope: scope
      });
    };


    // Private Functions
    function getStudent() {
      ss.student = TeacherData.Students.getStudent();
    }
  }
}
