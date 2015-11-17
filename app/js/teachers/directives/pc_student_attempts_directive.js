/**
 * A directive for displaying a students recent test attempts
 * Created by Jonathan Ullberg on 10/23/2015
 */
'use strict';

module.exports = function(app) {
  app.directive('pcStudentAttempts', [function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/teacher/student_attempts.html',
      controller: 'StudentAttemptsCtrl',
      scope: {
        attempts: '='
      },
      link: function(scope, iElement, iAttrs) {

      }
    };
  }])
}
