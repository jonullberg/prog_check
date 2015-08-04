'use strict';

module.exports = function(app) {
  app.controller('StudentTestsCtrl', ['$scope', 'Errors', 'Student', function($scope, Errors, Student) {
    $scope.student = Student.student();
    console.log($scope.student);
  }]);
};
