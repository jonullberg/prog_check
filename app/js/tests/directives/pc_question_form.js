'use strict';

module.exports = function(app) {
  app.directive('pcQuestionForm', function() {
    var controller = ['$scope', function($scope) {
      $scope.question = {
        answers: []
      };
    }];
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/question_form.html',
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
