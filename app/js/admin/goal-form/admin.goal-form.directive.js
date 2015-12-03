'use strict';
function pcGoalForm() {
    return {
        restrict: 'E',
        replace: true,
        templateUrl: '/js/admin/goal-form/goal_form.html',
        controller: 'GoalFormCtrl',
        congrollerAs: 'gf'
    };
}
module.exports = function (app) {
    app.directive('pcGoalForm', pcGoalForm);
};
