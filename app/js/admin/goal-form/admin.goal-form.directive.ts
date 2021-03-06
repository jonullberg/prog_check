/**
 * The Directive for the Admin Goal FOrm
 * For use in the Prog Check Testing application
 * Created by Jonathan Ullberg on 09/20/2015
 */
 /// <reference path="../../../../tools/typings/tsd.d.ts" />

module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .directive('pcGoalForm', pcGoalForm)

  function pcGoalForm() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/admin/goal-form.html',
      controller: 'GoalFormCtrl',
      controllerAs: 'gf'
    };
  }
}
