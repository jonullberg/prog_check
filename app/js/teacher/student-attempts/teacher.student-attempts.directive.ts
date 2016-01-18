/**
 * A directive for displaying a students recent test attempts
 * Created by Jonathan Ullberg on 10/23/2015
 */

module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .directive('pcStudentAttempts', ['$filter', 'TeacherData', pcStudentAttempts])

  function pcStudentAttempts($filter, TeacherData) {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/teacher/student-attempts.tmpl.html',
      scope: {
        attempts: '=',
        student: '=',
        loaded: '='
      },
      link: function(scope, iElement, iAttrs) {

        // Public Variables
        scope.currentPage = 1;
        scope.viewBy = 5;
        scope.maxSize = 5;
        scope.itemsPerPage = scope.viewBy;
        scope.totalItems = scope.attempts.length;
        scope.dataLoaded = true;
        var totalAttempts = scope.attempts;
        scope.attempts = $filter('orderBy')(totalAttempts, '-dateTaken').slice(((scope.currentPage - 1) * scope.itemsPerPage), (scope.currentPage * scope.itemsPerPage));

        // Would like to turn this into an HTTP call to the server.
        // Request first five then next five, etc, rather than
        // requesting all tests at the same time
        scope.changePage = function setPage(num) {
          scope.currentPage = num;
          var attempts = $filter('orderBy')(totalAttempts, '-dateTaken');
          var beginning = (num - 1) * scope.itemsPerPage;
          var end = num * scope.itemsPerPage;
          scope.attempts = attempts.slice(beginning, end);
        };

      }
    };
  }
}
