'use strict';

module.exports = function(app) {
  app.controller('SingleStandardModalCtrl', ['$scope', '$modal', '$modalInstance', '$cookies', '$rootScope', 'Errors', 'Standards', 'Students', function($scope, $modal, $modalInstance, $cookies, $rootScope, Errors, Standards, Students) {
    $scope.standard = Standards.standard;
    var getStandard = function() {
      $scope.standard = Standards.standard;
    };

    $scope.$on('standard:changed', getStandard);

    $scope.isAdmin = function() {
      if ($cookies.get('role') === 'admin') {
        return true;
      }
      return false;
    };
    $scope.getStandard = function() {
      getStandard();
    };

    $scope.goBack = function() {
      if ($scope.isAdmin()) {
        Standards.removeStandard();
        $scope.hideStandard();
      } else {
        var scope = $rootScope.$new();
        $modalInstance.close();
        $modal.open({
          animation:true,
          templateUrl:'/templates/directives/standards/standards_list.html',
          size:'lg',
          controller:'StandardsListCtrl',
          scope:scope
        });
      }
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

    $scope.showButtons = function(goal) {
      goal.buttons = !goal.buttons;
    };

    var editGoal = function(goal) {
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

    var addGoal = function(goal) {
      Students.addGoal(goal, function(err, data) {
        if (err) {
          return Errors.addError({
            'msg': 'There was an error adding goal'
          });
        }
      });
      $modalInstance.close();
    };

    $scope.selectGoal = function(goal) {
      if ($cookies.get('role') === 'admin') {
        editGoal(goal);
      } else if ($cookies.get('role') === 'teacher') {
        addGoal(goal);
      }
    };

    $scope.deleteGoal = function(goal) {
      Standards.deleteGoal(goal, function(err) {
        if (err) {
          return Errors.addError({
            'msg': 'Failed to delete goal'
          });
        }
      });
    };

  }]);
};