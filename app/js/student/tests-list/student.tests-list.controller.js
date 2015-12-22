var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('StudentTestsCtrl', ['$scope', '$location', '$routeParams', 'StudentData', 'AuthenticationService', studentTestsCtrl]);
    function studentTestsCtrl($scope, $location, $routeParams, StudentData, AuthenticationService) {
        $scope.$on('student:changed', getUser);
        $scope.init = init;
        $scope.getTest = getTest;
        function init() {
            getUser($routeParams.studentId);
        }
        function getTest(goal) {
            StudentData.Tests.fetchTest(goal, AuthenticationService.getUser(), function (err, data) {
                $location.path('/student/' + $routeParams.studentId + '/tests/' + data.test._id);
            });
        }
        function getUser(studentId) {
            if (!AuthenticationService.getUser() || AuthenticationService.getUser().role !== 'student') {
                $location.path('/sign-in');
            }
            $scope.student = AuthenticationService.getUser();
        }
    }
})(ProgCheck || (ProgCheck = {}));
