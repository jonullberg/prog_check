'use strict';
module.exports = function (app) {
    app.directive('pcAttemptProgressReport', [function () {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/templates/teacher/pc-attempt-progress-report.html',
                controller: 'ProgressReportCtrl'
            };
        }]);
};
