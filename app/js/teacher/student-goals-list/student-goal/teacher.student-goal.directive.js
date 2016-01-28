var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .directive('pcStudentGoal', ['$routeParams', '$uibModal', 'TeacherData', pcStudentGoal]);
    function pcStudentGoal($routeParams, $uibModal, TeacherData) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/templates/teacher/student-goal.tmpl.html',
            scope: {
                goal: '=',
                editStudentGoal: '&'
            },
            link: function (scope, iElement, iAttr) {
                scope.$on('attempts:changed', getAttempts);
                scope.loaded = false;
                scope.isAlertShown = false;
                scope.selectGoal = function (goal) {
                    if (goal.isOpen) {
                        scope.isAlertShown = false;
                        goal.isOpen = false;
                        scope.loaded = true;
                    }
                    else {
                        scope.isAlertShown = false;
                        goal.isOpen = true;
                        TeacherData.Attempts.fetchAttemptsByGoal($routeParams.studentId, scope.goal.goalId, function (err, data) {
                            scope.attempts = data.attempts;
                            scope.results = data.results;
                            scope.loaded = true;
                            scope.resultsLoaded = true;
                        });
                    }
                };
                scope.deleteGoal = function (goal) {
                    TeacherData.Students.deleteGoal($routeParams.studentId, goal.goalId);
                };
                scope.toggleAlert = function () {
                    scope.isAlertShown = !scope.isAlertShown;
                };
                function getAttempts(attempts) {
                    console.log('your attempts changed');
                    scope.attempts = TeacherData.Attempts.getAttempts();
                }
            }
        };
    }
})(ProgCheck || (ProgCheck = {}));
