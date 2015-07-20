'use strict';

module.exports = function(app) {
  app.controller('studentsListCtrl', ['$scope', '$modalInstance', '$cookies', 'RESTResource', 'dataStore', function($scope, $modalInstance, $cookies, resource, dataStore) {

    var Student = resource('students');

    $scope.saveStudent = function(student, valid) {
      student.teacherId = $cookies.get('userId');
      if (valid) {
        Student.create(student, function(err, data) {
          if (err) {
            console.log(err);
          }
          $modalInstance.close(function() {
            dataStore.students.push(data);
            student = null;
            console.log('saved successfully');

          });
        });

      }
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  }]);
};
