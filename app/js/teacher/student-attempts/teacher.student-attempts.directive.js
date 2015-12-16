/**
 * A directive for displaying a students recent test attempts
 * Created by Jonathan Ullberg on 10/23/2015
 */
var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .directive('pcStudentAttempts', pcStudentAttempts);
    // export = function(app) {
    //   app.directive('pcStudentAttempts', pcStudentAttempts);
    // }
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
