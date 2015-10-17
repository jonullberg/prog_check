'use strict';

module.exports = function(app) {
  app.controller('StudentsListCtrl', ['$scope', '$location', '$uibModal', '$rootScope', 'Errors', 'Students', function($scope, $location, $uibModal, $rootScope, Errors, Students) {

    var getStudents = function() {
      $scope.students = Students.students;
    };

    $scope.$on('students:changed', getStudents);

    $scope.getStudents = function() {
      Students.getStudents(function(err, data) {
        if (err) {
          return Errors.addError({
            'msg': 'Failed to get students from server'
          });
        }
      });
      getStudents();
    };

    $scope.showStudent = function(student) {
      Students.setStudent(student);
      $location.path('/teacher/students/' + student._id);
    };

    $scope.addStudent = function() {
      var scope = $rootScope.$new();
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
  }]);
};
