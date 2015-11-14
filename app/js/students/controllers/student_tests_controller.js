'use strict';

module.exports = function(app) {
  app.controller('StudentTestsCtrl', ['$scope', '$location', '$routeParams', 'StudentData', function($scope, $location, $routeParams, StudentData) {
    $scope.$on('student:changed', getStudent);
    $scope.init = init;
    $scope.getTest = getTest;
    function init() {
      getStudent($routeParams.studentId);
    }

    function getTest(goal) {
      StudentData.Tests.fetchTest(goal._id, StudentData.getStudent(), function(err, data) {
        $location.path('/student/' + $routeParams.studentId + '/tests/' + data.test._id);
      });
    }

    function getStudent(studentId) {
      if (!StudentData.getStudent()) {
        StudentData.fetchStudent(studentId);
      }
      $scope.student = StudentData.getStudent();
    }
  }]);
};
