/**
 * A controller for viewing a single standard as an admin
 * Created by Jonathan on 07/14/2015
 */
'use strict';

module.exports = function(app) {
  app.controller('SingleStandardCtrl', ['$scope', '$uibModal', '$cookies', '$rootScope', '$routeParams', '$location', 'AdminData', function($scope, $uibModal, $cookies, $rootScope, $routeParams, $location, AdminData) {
    $scope.params = {
      goalButtonText: 'Edit Goal'
    };
    $scope.$on('standard:changed', function() {
      getStandard();
    });

    $scope.isAdmin = function() {
      if (AdminData.getUser().role === 'admin') {
        return true;
      }
      return false;
    };


    $scope.edit = function(standard) {
      var scope = $rootScope.$new();
      scope.params = {
        formType: 'editing',
        buttonText: 'Save Standard'
      };
      $uibModal.open({
        animation:true,
        templateUrl: '/templates/directives/standards/standard_form.html',
        size:'lg',
        controller: 'StandardFormCtrl',
        controllerAs: 'goalForm',
        scope: scope
      });
    };

    $scope.toggleAlert = function() {
      if ($scope.isAlertShown) {
        $scope.isAlertShown = false;
      } else {
        $scope.isAlertShown = true;
      }
    };

    $scope.addGoals = function() {
      AdminData.Standards.setGoal(null);
      var scope = $rootScope.$new();
      scope.params = {
        buttonText: 'Add Goal',
        formType: 'creating'
      };
      $uibModal.open({
        animation:true,
        templateUrl: '/templates/partials/goal_form.html',
        controller: 'GoalCtrl',
        controllerAs: 'goalForm',
        size:'lg',
        scope:scope
      });
    };

    $scope.showButtons = showButtons;
    $scope.init = init;
    $scope.getStandard = getStandard;
    $scope.selectGoal = editGoal;
    $scope.goBack = goBack;
    $scope.deleteGoal = deleteGoal;
    $scope.deleteStandard = deleteStandard;

    function goBack() {
      AdminData.Standards.setStandard(null);
      AdminData.Tests.setTest(null);
      AdminData.Tests.setTests(null);
      $location.path('admin/standards');
    }
    function showButtons(goal) {
      $scope.standard.goals.forEach(function(goal) {
        goal.buttons = false;
      });
      goal.buttons = !goal.buttons;
    }
    function init() {
      getStandard();
    }
    function getStandard() {
      if (AdminData.Standards.getStandard()) {
        $scope.standard = AdminData.Standards.getStandard();
      } else if ($routeParams.standardId) {
        AdminData.Standards.fetchStandard($routeParams.standardId);
      }
    }
    function deleteStandard(standard) {
      AdminData.Standards.deleteStandard(standard._id, function(err, data) {
        $location.path('/admin/standards');
      });
    }
    function editGoal(goal) {
      var scope = $rootScope.$new();
      scope.params = {
        buttonText: 'Save Goal',
        formType: 'editing'
      };
      AdminData.Standards.setGoal(goal);
      $uibModal.open({
        animation:true,
        templateUrl: '/templates/partials/goal_form.html',
        controller: 'GoalCtrl',
        controllerAs: 'goalForm',
        size:'lg',
        scope: scope
      });
    }
    function deleteGoal(goal) {
      AdminData.Standards.deleteGoal($scope.standard, goal);
    }
  }]);
};
