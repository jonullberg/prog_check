/**
 * A Directive for displaying the statistics for a student
 */
module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .directive('pcAttemptProgressReport', pcAttemptProgressReport)

  function pcAttemptProgressReport() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/js/teacher/goal-progress-report/goal-progress-report.html',
      controller: 'ProgressReportCtrl as pr'
    };
  }

}
