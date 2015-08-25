'use strict';

module.exports = function(app) {
  app.controller('SingleStandardModalCtrl', ['$scope', '$modal', '$modalInstance', '$cookies', '$rootScope', 'Errors', 'Standards', 'Students', 'Tests', function($scope, $modal, $modalInstance, $cookies, $rootScope, Errors, Standards, Students, Tests) {
    $scope.standard = Standards.standard;
    var getStandard = function() {
      $scope.standard = Standards.standard;
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

    var showSample = function(goal) {
      goal.sampleShowing = !goal.sampleShowing;
    };

    $scope.$on('standard:changed', getStandard);

    $scope.getStandard = function() {
      getStandard();
    };

    $scope.goBack = function() {
      var scope = $rootScope.$new();
      $modalInstance.close();
      $modal.open({
        animation:true,
        templateUrl:'/templates/directives/standards/standards_list.html',
        size:'lg',
        controller:'StandardsListModalCtrl',
        scope:scope
      });
    };

    $scope.showGoal = function(goal) {
      $scope.goal = goal;
      console.log(goal);
      Tests.getTestByGoalId(goal, function(err, data) {
        if (err) {
          return Errors.addError({
            'msg': 'There was an error getting that test'
          });
        }
        if (data[0].questions[0].question) {
          $scope.sampleQuestion = data[0].questions[0].question;

        } else {
          $scope.sampleQuestion = 'Unfortunately we do not have any questions for this goal.'
        }

      });
      showSample(goal);

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

    $scope.addGoal = function(goal) {
      // console.log(goal);
      addGoal(goal);
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
