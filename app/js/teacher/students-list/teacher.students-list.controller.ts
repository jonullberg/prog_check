'use strict';

export = function(app) {
  app.controller('StudentsListCtrl', ['$scope', '$location', '$uibModal', '$rootScope', '$routeParams', 'TeacherData', function($scope, $location, $uibModal, $rootScope, $routeParams, TeacherData) {
    $scope.init = init;

    $scope.$on('students:changed', getStudents);

    $scope.showStudent = function(student) {
      TeacherData.Students.setStudent(student);
      $location.path('/teacher/' + $routeParams.teacherId + '/students/' + student._id);
    };

    $scope.addStudent = function() {
      var scope = $rootScope.$new();
      TeacherData.Students.setStudent(null);
      scope.params = {
        formType: 'creating',
        buttonText: 'Create Student'
      };
      $uibModal.open({
        animation:true,
        templateUrl: '/templates/directives/teachers/student_form.html',
        size: 'lg',
        controller: 'StudentFormCtrl',
        scope: scope
      });
    };
    function init() {
      getStudents();
    }
    function getStudents() {
      if (!TeacherData.Students.getStudents()) {
        TeacherData.Students.fetchStudents($routeParams.teacherId);
      }
      $scope.students = TeacherData.Students.getStudents();
    }
  }]);
};
