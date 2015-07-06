'use strict';

module.exports = function(app) {
  app.directive('pcTestForm', function() {
    var controller = ['$scope', function($scope) {
      $scope.question = {};
      $scope.areWeAddingQuestions = false;
      $scope.addQuestions = function(test) {
        $scope.areWeAddingQuestions = true;
        if (!$scope.test.questions) {
          $scope.test = {
            testDirections: test.testDirections,
            questions: []
          };
        }
      };
      $scope.addQuestion = function(question) {
        question.answers = Object.keys(question.answers)
          .map(function(key) {
            return question.answers[key];
          });
        $scope.test.questions.push(question);
        $scope.question = {};
      };
    }];
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/test_form.html',
      scope: {
        test: '=',
        buttonText: '=',
        save: '&'
      },
      controller: controller
    };
  });
};
