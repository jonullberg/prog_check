/**
 * A Directive for displaying the statistics for a student
 */
module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .directive('pcGoalProgressReport', pcGoalProgressReport)

  function pcGoalProgressReport() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/teacher/goal-progress-report.tmpl.html',
      scope: {
        results: '=',
        goal: '=',
        loaded: '=resultsLoaded'
      },
      controller: 'ProgressReportCtrl as pr',
      link: function(scope, iElement, iAttrs) {
      }
    };
  }

}
