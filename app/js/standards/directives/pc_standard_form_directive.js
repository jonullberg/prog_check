'use strict';

module.exports = function(app) {
  app.directive('pcStandardForm', function() {
    var controller = ['$scope', 'pcGrades', function($scope, pcGrades) {

      $scope.grades = angular.fromJson(pcGrades.grades);
      $scope.thisGrade;
      $scope.changeGrade = function(grade) {
        $scope.thisGrade = angular.fromJson(grade);
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
