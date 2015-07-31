'use strict';

module.exports = function(app) {
  app.controller('StudentFormCtrl', ['$scope', '$modalInstance', '$cookies', 'Errors', 'Students', function($scope, $modalInstance, $cookies, Errors, Students) {


    $scope.saveStudent = function(student) {
      student.teacherId = $cookies.get('userId');
      if ($scope.studentForm.$valid) {
        Students.addStudent(student, function(err, data) {
          if (err) {
            return Errors.addError({
              'msg': 'Failed to create student'
            });
          }
        });

        $modalInstance.close();
      }
    };

    $scope.cancel = function() {
      $modalInstance.dismiss('cancel');
    };
  }]);
};
