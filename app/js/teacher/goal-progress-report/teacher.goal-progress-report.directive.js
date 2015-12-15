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
            templateUrl: '/js/teacher/goal-progress-report/goal-progress-report.html',
            controller: 'ProgressReportCtrl'
        };
    }
})(ProgCheck || (ProgCheck = {}));
