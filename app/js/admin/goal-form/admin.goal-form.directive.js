/**
 * The Directive for the Admin Goal FOrm
 * For use in the Prog Check Testing application
 * Created by Jonathan Ullberg on 09/20/2015
 */
/// <reference path="../../../../tools/typings/tsd.d.ts" />
var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .directive('pcGoalForm', pcGoalForm);
    // export = function(app) {
    //   app.directive;
    // };
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
