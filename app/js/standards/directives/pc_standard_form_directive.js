'use strict';

module.exports = function(app) {
  app.directive('pcStandardForm', function() {
    var controller = ['$scope', 'pcGrades', function($scope, pcGrades) {
      $scope.grades = angular.fromJson(pcGrades.grades);
      $scope.thisGrade;
      $scope.isCreatingGoal = false;

      $scope.toggleGoalForm = function() {
        $scope.isCreatingGoal = !$scope.isCreatingGoal;
      }

      $scope.createStandard = function(standard) {
        if (standard === undefined) {
          $scope.standard = {
            goals: []
          };
        }
      };

      $scope.processStandard = function(standard) {
        standard.shortGrade = $scope.grades.filter(function(obj) {
          if (obj.name === standard.gradeName) {
            return obj;
          }
        }).map(function(obj) {
          return obj.shortName;
        })[0];
        console.log(standard);
        $scope.standard = standard;
        $scope.save({standard: standard});
      };
      $scope.changeGrade = function(grade) {
        $scope.thisGrade = $scope.grades.filter(function(obj) {
          return obj.name === grade;
        });
      };
      $scope.addGoal = function(goal) {
        goal.name = 'Goal #' + ($scope.standard.goals.length + 1);
        $scope.standard.goals.push(goal);
        goal = null;
        $scope.toggleGoalForm();
      };
    }];
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/standard_form.html',
      scope: {
        save: '&',
        standard: '=',
        addStandard: '&',
        toggle: '&',
        buttonText: '='
      },
      controller: controller
    };
  });
};
