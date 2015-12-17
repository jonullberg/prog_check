var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .directive('pcGoalForm', pcGoalForm);
    function pcGoalForm() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/js/admin/goal-form/goal_form.html',
            controller: 'GoalFormCtrl',
            controllerAs: 'gf'
        };
    }
})(ProgCheck || (ProgCheck = {}));
