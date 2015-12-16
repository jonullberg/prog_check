/**
 * A controller for viewing a single standard as an admin
 * Created by Jonathan on 07/14/2015
 */
 /// <reference path="../../../../tools/typings/angularjs/angular.d.ts" />
module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .controller('SingleStandardCtrl', ['$scope', '$uibModal', '$rootScope', '$routeParams', '$location', 'AdminData', singleStandardCtrl]);

  // export = function(app) {
  //   app.controller('SingleStandardCtrl', ['$scope', '$uibModal', '$rootScope', '$routeParams', '$location', 'AdminData', singleStandardCtrl]);
  // };

  function singleStandardCtrl($scope, $uibModal: ng.ui.bootstrap.IModalService, $rootScope: ng.IRootScopeService, $routeParams, $location, AdminData) {

    $scope.$on('standard:changed', function() {
      getStandard();
    });

    // Public Functions
    var ss = this;
    ss.mainClass = 'panel panel-primary';
    ss.headingClass = 'panel-heading';
    ss.bodyClass = 'panel-body';
    ss.footerClass = 'panel-footer';
    ss.init = function() {
      getStandard();
    };
    ss.goBack = function() {
      AdminData.Standards.setStandard(null);
      AdminData.Tests.setTest(null);
      AdminData.Tests.setTests(null);
      $location.path('admin/standards');
    };

    ss.deleteStandard = function(standard) {
      AdminData.Standards.deleteStandard(standard._id, function(err, data) {
        $location.path('/admin/standards');
      });
    };

    ss.toggleAlert = function() {
      if (ss.isAlertShown) {
        ss.isAlertShown = false;
      } else {
        ss.isAlertShown = true;
      }
    };

    ss.isAdmin = function() {
      if (AdminData.getUser().role === 'admin') {
        return true;
      }
      return false;
    };

    ss.showButtons = function(goal) {
      var original = goal.buttons;
      ss.standard.goals.forEach(function(goal) {
        goal.buttons = false;
      });
      goal.buttons = !original;
    };

    ss.edit = function(standard) {
      var scope = $rootScope.$new();
      scope.params = {
        formType: 'editing',
        buttonText: 'Save Standard'
      };
      $uibModal.open({
        animation:true,
        templateUrl: '/js/admin/standard-form/standard-form.html',
        size:'lg',
        controller: 'StandardFormCtrl',
        controllerAs: 'sf',
        scope: scope
      });
    };

    ss.addGoals = function() {
      AdminData.Standards.setGoal(null);
      var scope = $rootScope.$new();
      scope.params = {
        buttonText: 'Add Goal',
        formType: 'creating'
      };
      $uibModal.open({
        animation:true,
        templateUrl: '/js/admin/goal-form/goal-form.html',
        controller: 'GoalFormCtrl',
        controllerAs: 'gf',
        size:'lg',
        scope:scope
      });
    };

    ss.selectGoal = function(goal) {
      var scope = $rootScope.$new();
      scope.params = {
        buttonText: 'Save Goal',
        formType: 'editing'
      };
      AdminData.Standards.setGoal(goal);
      $uibModal.open({
        animation:true,
        templateUrl: '/js/admin/goal-form/goal-form.html',
        controller: 'GoalFormCtrl',
        controllerAs: 'gf',
        size:'lg',
        scope: scope
      });
    };

    ss.deleteGoal = function(goal) {
      AdminData.Standards.deleteGoal(ss.standard, goal);
    };

    ss.getStandard = getStandard;

    // Private Functions
    function getStandard() {
      if (!AdminData.Standards.getStandard()) {
        AdminData.Standards.fetchStandard($routeParams.standardId);
      }
      ss.standard = AdminData.Standards.getStandard();
    }
  }

}
