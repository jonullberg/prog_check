'use strict';

module.exports = function(app) {
  app.directive('pcQuestionForm', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/question_form.html',
      scope: {
        question: '=',
        save: '&'
      }
    };
  });
};
