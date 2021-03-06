/**
 * The directive for a students question
 * For use in the Prog Check testing application
 * Created by Jonathan Ullberg on 10/03/2015
 * /app/js/student/question/student.question.directive.ts
 */

module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .directive('pcQuestion', pcQuestion)

  function pcQuestion() {
    return {
      restrict: 'E',
      templateUrl: '/templates/student/question.html',
      replace:true,
      controller: 'QuestionCtrl',
      scope: {
        question: '=',
        selectAnswer: '&'
      },
      link: function(scope, iEl, iAttr) {
      }
    };
  }
}
