'use strict';
module.exports = function (app) {
    app.controller('StudentTestsCtrl', ['$scope', '$location', '$routeParams', 'StudentData', function ($scope, $location, $routeParams, StudentData) {
            $scope.$on('student:changed', getUser);
            $scope.init = init;
            $scope.getTest = getTest;
            function init() {
                getUser($routeParams.studentId);
            }
            function getTest(goal) {
                StudentData.Tests.fetchTest(goal.goalId, StudentData.getUser(), function (err, data) {
                    $location.path('/student/' + $routeParams.studentId + '/tests/' + data.test._id);
                });
            }
            function getUser(studentId) {
                if (!StudentData.getUser()) {
                    StudentData.fetchStudent(studentId);
                }
                $scope.student = StudentData.getUser();
            }
        }]);
};
