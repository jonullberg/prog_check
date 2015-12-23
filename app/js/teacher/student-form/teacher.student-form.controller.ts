module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .controller('StudentFormCtrl', ['$scope', '$uibModalInstance', '$routeParams', '$location', 'Errors', 'TeacherData', studentFormCtrl])

  function studentFormCtrl($scope, $uibModalInstance, $routeParams, $location, Errors, TeacherData) {

    $scope.$on('student:changed', getStudent);

    var sf = this;
    sf.init = function() {
      getStudent();
    };

    sf.questionOptions = [5, 10];
    sf.isStudentDeleteShown = false;

    sf.saveStudent = function(student) {
      student.teacherId = $routeParams.teacherId;
      if ($scope.studentForm.$valid) {
        if ($scope.params.formType === 'editing') {
          updateStudent(student);
        } else if ($scope.params.formType === 'creating') {
          createStudent(student);
        }
      }
      $uibModalInstance.close();
    };

    sf.cancel = function() {
      $uibModalInstance.dismiss('cancel');
    };

    sf.toggleStudentDelete = function() {
      sf.isStudentDeleteShown = !sf.isStudentDeleteShown;
    };

    sf.deleteStudent = function(student) {
      $location.path('/teacher/' + $routeParams.teacherId + '/students');
      TeacherData.Students.deleteStudent(student._id, function(err) {
        TeacherData.Students.setStudent(null);
        $uibModalInstance.close();
      });
    };

    function getStudent() {
      if (!TeacherData.Students.getStudent() && $scope.params.formType === 'editing') {
        TeacherData.Students.fetchStudent($routeParams.studentId);
      }
      sf.student = TeacherData.Students.getStudent();
    }

    function createStudent(student) {
      TeacherData.Students.createStudent(student, function(err, data) {
        $location.path('/teacher/' + $routeParams.teacherId + '/students/' + data.student._id);
      });
    }

    function updateStudent(student) {
      TeacherData.Students.updateStudent(student, function() {
        $location.path('/teacher/' + $routeParams.teacherId + '/students/' + student._id);
      });
    }
  }
}
