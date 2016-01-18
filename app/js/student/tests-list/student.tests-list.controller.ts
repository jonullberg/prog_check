module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .controller('StudentTestsCtrl', ['$scope', '$location', '$routeParams', 'StudentData', 'AuthenticationService', studentTestsCtrl])

  function studentTestsCtrl($scope, $location, $routeParams, StudentData, AuthenticationService) {
    $scope.$on('student:changed', getStudent);

    var studentTestsCtrl = this;
    studentTestsCtrl.init = function init() {
      StudentData.fetchStudent($routeParams.studentId);
    };
    studentTestsCtrl.getTest = function getTest(goal) {
      StudentData.Tests.fetchTest(goal, StudentData.getStudent(), function(err, data) {
        $location.path('/student/' + $routeParams.studentId + '/tests/' + data.test.testId).search('goalId', goal.goalId);
      });
    };

    function getStudent(studentId) {
      studentTestsCtrl.student = StudentData.getStudent();
    }
  }

}
