'use strict';

module.exports = function(app) {
  app.controller('StudentsListCtrl', ['$scope', '$location', '$modal', '$rootScope', '$routeParams', 'Errors', 'Students', function($scope, $location, $modal, $rootScope, $routeParams, Errors, Students) {

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
      $location.path('/teacher/' + $routeParams.teacherId + '/students/' + student._id);
    };

    $scope.addStudent = function() {
      var scope = $rootScope.$new();
      scope.params = {
        formType: 'creating',
        buttonText: 'Create Student'
      };
      scope.student = {};
      $modal.open({
        animation:true,
        templateUrl: '/templates/directives/teachers/student_form.html',
        size: 'lg',
        controller: 'StudentFormCtrl',
        scope: scope
      });
    };
  }]);
};
