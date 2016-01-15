module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .controller('SingleStudentCtrl', ['$scope', '$routeParams', '$uibModal', '$location', '$rootScope', '$sce', 'TeacherData', singleStudentCtrl])

  function singleStudentCtrl($scope, $routeParams, $uibModal, $location, $rootScope, $sce, TeacherData) {
    $scope.$on('student:changed', getStudent);

    // Public Methods

    var ss = this;

    ss.dataLoaded = false;
    ss.init = function() {
      TeacherData.Students.fetchStudent($routeParams.studentId, function(err, data) {
        ss.dataLoaded = true;
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
        templateUrl: '/templates/teacher/standards-list-modal.tmpl.html',
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
      ss.dataLoaded = TeacherData.Students.getStudent();
      ss.student = TeacherData.Students.getStudent();
    }
  }
}
