'use strict';

module.exports = function(app) {
  app.controller('TeacherCtrl', ['$scope', '$location', '$modal', 'RESTResource', 'dataStore', function($scope, $location, $modal, resource, dataStore) {

    var Student = resource('students');

    $scope.students;

    $scope.getStudents = function() {
      dataStore.getStudents(function(err, data) {
        if (err) {
          console.log(err);
          return;
        }
        $scope.students = data;
      });
    };

    $scope.showStudent = function(student) {
      var url = 'teacher/students/' + student._id;
      $location.path(url);
    }

    $scope.open = function(size) {
      $modal.open({
        animation: true,
        templateUrl: '/templates/directives/teachers/add_student_form.html',
        controller: 'StandardsListCtrl',
        size: size
      });
    };

  }]);
};
