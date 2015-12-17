/**
 * A Directive for the Question Form
 * For use in the Prog Check testing application
 * Created by Jonathan Ullberg on 10/20/2015
 */
 /// <reference path="../../../../tools/typings/tsd.d.ts" />

module ProgCheck {
  'use strict';
  angular
    .module('progCheck')
    .directive('pcQuestionForm', pcQuestionForm);

  function pcQuestionForm() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/js/admin/question-form/question-form.html',
      scope: {
        formType: '=',
        buttonText: '=',
        test: '='
      },
      link: function(scope, iElement, iAttr) {

      }
    };
  }

}
