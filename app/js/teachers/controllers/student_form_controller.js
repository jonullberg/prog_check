'use strict';

module.exports = function(app) {
  app.controller('StudentFormCtrl', ['$scope', '$modalInstance', '$cookies', '$location', 'Errors', 'Students', function($scope, $modalInstance, $cookies, $location, Errors, Students) {

    var getStudent = function() {
      $scope.student = Students.student;
    };

    var createStudent = function(student) {
      Students.addStudent(student, function(err, data) {
        if (err) {
          return Errors.addError({
            'msg': 'Failed to create student'
          });
        }
      });
    };

    var saveStudent = function(student) {
      Students.saveStudent(student, function(err, data) {
        if (err) {
          return Errors.addError({
            'msg': 'Failed to save student'
          });
        }
      });
    };

    $scope.getStudent = function() {
      getStudent();
    };

    $scope.questionOptions = [5, 10];

    $scope.isDeleteShown = false;

    $scope.saveStudent = function(student) {
      student.teacherId = $cookies.getObject('user')._id;
      if ($scope.studentForm.$valid) {
        if ($scope.params.formType === 'editing') {
          saveStudent(student);
          $modalInstance.close();
        } else if ($scope.params.formType === 'creating') {
          createStudent(student);
          $modalInstance.close();
          $location.path('/teacher/students')
        }
      }
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
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
        Students.student = null;
        $modalInstance.close();
        $location.path('/teacher/students');
      });
    };


  }]);
};
