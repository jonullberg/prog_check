/**
 * The Directive for the Admin Goal FOrm
 * For use in the Prog Check Testing application
 * Created by Jonathan Ullberg on 09/20/2015
 */
'use strict';

export = function(app) {
  app.directive('pcGoalForm', pcGoalForm);
};
function pcGoalForm() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/js/admin/goal-form/goal_form.html',
    controller: 'GoalFormCtrl',
    congrollerAs: 'gf'
  };
}