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
            templateUrl: '/templates/teacher/goal-progress-report.tmpl.html',
            scope: {
                results: '=',
                goal: '='
            },
            controller: 'ProgressReportCtrl as pr'
        };
    }
})(ProgCheck || (ProgCheck = {}));
