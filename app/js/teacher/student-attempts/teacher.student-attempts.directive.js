var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .directive('pcStudentAttempts', pcStudentAttempts);
    function pcStudentAttempts() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/js/teacher/student-attempts/student-attempts.html',
            controller: 'StudentAttemptsCtrl',
            scope: {
                attempts: '='
            },
            link: function (scope, iElement, iAttrs) {
            }
        };
    }
})(ProgCheck || (ProgCheck = {}));
