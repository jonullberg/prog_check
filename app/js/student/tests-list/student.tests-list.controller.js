var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('StudentTestsCtrl', ['$scope', '$location', '$routeParams', 'StudentData', 'AuthenticationService', studentTestsCtrl]);
    function studentTestsCtrl($scope, $location, $routeParams, StudentData, AuthenticationService) {
        $scope.$on('student:changed', getUser);
        var studentTestsCtrl = this;
        studentTestsCtrl.init = function init() {
            getUser($routeParams.studentId);
        };
        studentTestsCtrl.getTest = function getTest(goal) {
            StudentData.Tests.fetchTest(goal, AuthenticationService.getUser(), function (err, data) {
                $location.path('/student/' + $routeParams.studentId + '/tests/' + data.test.testId).search('goalId', goal.goalId);
            });
        };
        function getUser(studentId) {
            if (!AuthenticationService.getUser() || AuthenticationService.getUser().role !== 'student') {
                $location.path('/sign-in');
            }
            studentTestsCtrl.student = AuthenticationService.getUser();
        }
    }
})(ProgCheck || (ProgCheck = {}));
