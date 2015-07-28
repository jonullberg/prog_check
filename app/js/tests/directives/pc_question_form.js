'use strict';

module.exports = function(app) {
  app.directive('pcQuestionForm', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/partials/question_form.html',
      scope: {
        question: '=',
        save: '&',
        addQuestion: '&',
        buttonText: '=',
        cancel: '&'
      }
    };
  });
};
