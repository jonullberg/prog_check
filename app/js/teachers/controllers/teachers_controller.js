'use strict';

module.exports = function(app) {
  app.controller('teacherCtrl', ['$scope', '$modal', 'RESTResource', 'dataStore', function($scope, $modal, resource, dataStore) {

    var Student = resource('students');

    $scope.source = dataStore;

    $scope.getStudents = function() {
      Student.getAll(function(err, data) {
        $scope.students = dataStore.getStudents(function(err, data) {
          if (err) {
            console.log(err);
            return;
          }
        });
      });
    };

    $scope.open = function(size) {
      $modal.open({
        animation: true,
        templateUrl: '/templates/directives/teachers/add_student_form.html',
        controller: 'studentsListCtrl',
        size: size
      });
    };

  }]);
};
