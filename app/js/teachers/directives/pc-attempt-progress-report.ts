/**
 * A Directive for displaying the statistics for a student
 */
'use strict';

export = function(app) {
  app.directive('pcAttemptProgressReport', [function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/teacher/pc-attempt-progress-report.html',
      controller: 'ProgressReportCtrl'
    };
  }]);
};
