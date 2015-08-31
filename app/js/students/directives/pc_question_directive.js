'use strict';

module.exports = function(app) {
  app.directive('pcQuestion', [function () {
    return {
      restrict: 'E',
      templateUrl: '/templates/directives/student/question.html',
      replace:true,
      controller: 'QuestionCtrl',
      scope: {
        question: '=',
        selectAnswer: '&'
      }
    };
  }]);
};
