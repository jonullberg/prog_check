'use strict';

module.exports = function(app) {
  app.controller('SingleStandardCtrl', ['$scope', '$modal', '$rootScope', 'dataStore', 'Errors', 'Standards', function($scope, $modal, $rootScope, dataStore, Errors, Standards) {
    $scope.standard = Standards.standard;
    var getStandard = function() {
      $scope.standard = Standards.standard;
    };

    $scope.$on('standard:changed', getStandard);


    $scope.getStandard = function() {
      getStandard();
    };

    $scope.goBack = function() {
      Standards.removeStandard();
      $scope.hideStandard();
    };

    $scope.deleteStandard = function(standard) {
      Standards.removeStandard();
      Standards.deleteStandard(standard, function(err) {
        if (err) {
          return Errors.addError({
            'msg': 'There was an error deleting this standard'
          });
        }
      });
      $scope.hideStandard();
    };

    $scope.edit = function(standard) {
      Standards.standard = standard;
      var scope = $rootScope.$new();
      scope.params = {
        formType: 'editing',
        buttonText: 'Save Standard'
      };
      $modal.open({
        animation:true,
        templateUrl: '/templates/directives/standards/standard_form.html',
        size:'lg',
        controller: 'StandardFormCtrl',
        scope: scope
      });
    };

    // TODO: put this into alert directive
    $scope.toggleAlert = function() {
      if ($scope.isAlertShown) {
        $scope.isAlertShown = false;
      } else {
        $scope.isAlertShown = true;
      }
    };

    $scope.addGoals = function() {
      var scope = $rootScope.$new();
      scope.params = {
        buttonText: 'Add Goal',
        formType: 'creating'
      };
      $modal.open({
        animation:true,
        templateUrl: '/templates/partials/goal_form.html',
        controller: 'GoalCtrl',
        size:'lg',
        scope:scope
      });
    };

    $scope.editGoal = function(goal) {
      var scope = $rootScope.$new();
      scope.params = {
        buttonText: 'Save Goal',
        formType: 'editing'
      };
      scope.goal = goal;
      $modal.open({
        animation:true,
        templateUrl: '/templates/partials/goal_form.html',
        controller: 'GoalCtrl',
        size:'lg',
        scope: scope
      });
    };

    $scope.deleteGoal = function(goal) {
      Standards.deleteGoal(goal, function(err) {
        if (err) {
          return Errors.addError({
            'msg': 'Failed to delete that goal'
          });
        }
      });
    };
  }]);
};
