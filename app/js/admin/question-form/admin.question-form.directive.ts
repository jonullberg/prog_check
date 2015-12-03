/**
 * A Directive for the Question Form
 * For use in the Prog Check testing application
 * Created by Jonathan Ullberg on 10/20/2015
 */
'use strict';

export = function(app) {
  app.directive('pcQuestionForm', pcQuestionForm);
};

function pcQuestionForm() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: './question-form.html',
    scope: {
      question: '=',
      save: '&',
      addQuestion: '&',
      buttonText: '=',
      cancel: '&'
    }
  };
}