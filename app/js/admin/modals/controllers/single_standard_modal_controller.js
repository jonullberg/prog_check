'use strict';

module.exports = function(app) {
  app.controller('SingleStandardModalCtrl', ['$scope', '$uibModal', '$modalInstance', '$cookies', '$rootScope', '$sce', 'Errors', 'Standards', 'Students', 'Tests', function($scope, $uibModal, $modalInstance, $cookies, $rootScope, $sce, Errors, Standards, Students, Tests) {

    $scope.standard = Standards.standard;

    var getStandard = function() {
      $scope.standard = Standards.standard;
      $scope.standard.goals.forEach(function(goal) {
        Tests.getTestByGoalId(goal, function(err, data) {
          var test = data[0];
          if (!test) {
            return goal.sampleQuestion = 'There was no example questions for this goal.';
          }
          var question = data[0].questions[0];
          if (!question) {
            return goal.sampleQuestion = 'There was no example questions for this goal.';
          }
          goal.sampleQuestion = question.question;
        });
      });
    };

    var addGoal = function(goal) {
      var scope = $rootScope.$new();
      scope.params = {
        buttonText: 'Add Goal',
        formType: 'creating'
      };
      scope.goal = goal;
      scope.student = $scope.student;
      $modalInstance.close();
      $uibodal.open({
        animation:true,
        templateUrl: '/templates/teacher/student_goal_settings.html',
        size:'lg',
        controller: 'StudentGoalSettingsCtrl',
        scope: scope
      });
    };

    var showSample = function(goal) {
      goal.enableExample = !goal.enableExample;
    };

    $scope.trustAsHtml = $sce.trustAsHtml;

    $scope.$on('standard:changed', getStandard);

    $scope.getStandard = function() {
      getStandard();
    };

    $scope.goBack = function() {
      var scope = $rootScope.$new();
      $modalInstance.close();
      $uibModal.open({
        animation:true,
        templateUrl:'/templates/directives/standards/standards_list.html',
        size:'lg',
        controller:'StandardsListModalCtrl',
        scope:scope
      });
    };

    $scope.showExampleQuestion = function(selectedGoal) {
      $scope.standard.goals.forEach(function(goal) {
        goal.enableExample = false;

      });
      selectedGoal.enableExample = true;
    };

    $scope.showGoal = function(goal) {
      Tests.getTestByGoalId(goal, function(err, data) {
        if (err) {
          return Errors.addError({
            'msg': 'There was an error getting that test'
          });
        }
        if (data[0].questions[0].question) {
          $scope.sampleQuestion = data[0].questions[0].question;

        } else {
          $scope.sampleQuestion = 'Unfortunately we do not have any questions for this goal.';
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
      $uibModal.open({
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
    $scope.showDescription = function(goal) {
      $scope.standard.goals.forEach(function(goal) {
        goal.descriptionShowing = false;
      });
      goal.descriptionShowing = true;
    };
  }]);
};
