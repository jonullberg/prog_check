/**
 * A Directive for displaying the statistics for a student
 */
var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .directive('pcAttemptProgressReport', pcAttemptProgressReport);
    function pcAttemptProgressReport() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/templates/teacher/goal-progress-report.html',
            controller: 'ProgressReportCtrl as pr'
        };
    }
})(ProgCheck || (ProgCheck = {}));
