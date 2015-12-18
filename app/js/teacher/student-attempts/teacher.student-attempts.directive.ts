/**
 * A directive for displaying a students recent test attempts
 * Created by Jonathan Ullberg on 10/23/2015
 */

module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .directive('pcStudentAttempts', pcStudentAttempts)

  function pcStudentAttempts() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/teacher/student-attempts.html',
      controller: 'StudentAttemptsCtrl',
      scope: {
        attempts: '='
      },
      link: function(scope, iElement, iAttrs) {

      }
    };
  }
}
