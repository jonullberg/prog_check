/**
 * A controller for the Admin Goal Form
 * For use in the Prog Check Testing application
 * Created by Jonathan Ullberg on 09/20/2015
 * /app/js/admin/goal-form/admin.goal-form.controller.ts
 */
 /// <reference path="../../../../tools/typings/tsd.d.ts" />

module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .controller('GoalFormCtrl', ['$scope', '$uibModalInstance', '$routeParams', 'AdminData', goalFormCtrl]);

  function goalFormCtrl($scope, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, $routeParams, AdminData) {
    var gf = this;
    gf.save = function(goal) {
      if ($scope.goalForm.$valid) {
        if ($scope.params.formType === 'creating') {
          createGoal(goal);
        } else if ($scope.params.formType === 'editing') {
          updateGoal(goal);
        }
        $uibModalInstance.close();
      }
    };

    gf.cancel = function() {
      $uibModalInstance.dismiss(function() {
        AdminData.Standards.setGoal(null)
      });
    };

    gf.init = function() {
      getGoal();
    };


    function getGoal() {
      gf.goal = AdminData.Standards.getGoal();
    }
    function createGoal(goal) {
      AdminData.Standards.createGoal($routeParams.standardId, goal, function(err, data) {
        AdminData.Standards.setGoal(null);
      });
    }
    function updateGoal(goal) {
      AdminData.Standards.updateGoal($routeParams.standardId, goal, function(err) {
        AdminData.Standards.setGoal(null);
      });
    }
  }

}
