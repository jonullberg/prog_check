'use strict';

module.exports = function(app) {
  app.directive('pcStandardForm', function() {
    var controller = ['$scope', 'Errors', 'dataStore', 'pcGrades', function($scope, Errors, dataStore, pcGrades) {

      var grades = angular.fromJson(pcGrades.grades);
    $scope.thisGrade;


    $scope.createStandard = function(standard) {
      if (!standard) {
        if (!dataStore.standard) {
          dataStore.standard = {};
        }
      }
      if (!dataStore.standard.goals) {
        dataStore.standard.goals = [];
      }
      $scope.standard = dataStore.standard;
    };


    $scope.saveStandard = function(standard) {
      standard.shortGrade = grades.filter(function(obj) {
        if (obj.name === standard.gradeName) {
          return obj;
        }
      }).map(function(obj) {
        return obj.shortName;
      })[0];
      dataStore.addStandard(standard);
    };


    // Needs to be refactored
    $scope.isCreatingGoal = false;

    $scope.toggleGoalForm = function() {
      $scope.isCreatingGoal = !$scope.isCreatingGoal;
    }


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
      templateUrl: '/templates/directives/standards/standard_form.html',
      scope: {
        buttonText: '=',
        standard: '='
      },
      controller: controller
    };
  });
};
