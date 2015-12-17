/**
 * A Directive that displays a list of student goals on repeat
 */
module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .directive('pcStudentGoalsList', pcStudentGoalsList)

  // export = function(app) {
  //   app.directive('pcStudentGoalsList', pcStudentGoalsList)
  // }
  function pcStudentGoalsList() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/js/teacher/student-goals-list/student-goals-list.html',
      link: function(scope, iElement, iAttrs) {

      },
      controller: 'StudentGoalsListCtrl'
    };
  }

}
