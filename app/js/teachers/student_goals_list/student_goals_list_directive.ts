/**
 * A Directive that displays a list of student goals on repeat
 */
'use strict';

export = function(app) {
  app.directive('pcStudentGoalsList', [function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/teacher/student_goals_list.html',
      link: function(scope, iElement, iAttrs) {

      },
      controller: 'StudentGoalsListCtrl'
    };
  }]);
};
