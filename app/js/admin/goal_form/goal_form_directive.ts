/**
 * The Directive for the Admin Goal FOrm
 * For use in the Prog Check Testing application
 * Created by Jonathan Ullberg on 09/20/2015
 */
'use strict';

export = function(app) {
  app.directive('pcGoalForm', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/standards/goal_form.html',
      scope: {
        save: '&',
        goal: '='
      }
    };
  });
};
