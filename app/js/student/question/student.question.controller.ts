/**
 * The controller for a students question
 * For use in the Prog Check testing application
 * Created by Jonathan Ullberg on 10/03/2015
 * /app/js/student/question/student.question.controller.ts
 */

module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .controller('QuestionCtrl', ['$scope', '$sce', questionCtrl])

  function questionCtrl($scope, $sce: ng.ISCEService) {
    $scope.trustAsHtml = $sce.trustAsHtml;
    $scope.select = function(answer: string, $index: number) {
      $scope.question.selectedIndex = $index;
      $scope.selectAnswer({
        answer: answer
      });
    };
  }
}
