/**
 * The Controller for a students test
 * For use in the Prog Check testing Application
 * Created by Jonathan Ullberg on 11/02/2015
 * /app/js/student/test/student.test.controller.ts
 */

module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .controller('StudentTestCtrl', ['$scope', '$routeParams', '$location', 'StudentData', studentTestCtrl])

  function studentTestCtrl($scope:any, $routeParams:any, $location:any, StudentData:any) {
    $scope.$on('user:changed', getUser);
    $scope.$on('test:changed', getTest);
    $scope.init = function() {
      getUser();
      getTest();
      $scope.current = 1;
      $scope.question = $scope.test.questions[0];
    };
    $scope.nextText = 'Next';

    $scope.nextQuestion = function() {
      console.log($scope.test);
      console.log($scope.current);
      var currentQuestion = $scope.test.questions[$scope.current - 1];
      var nextQuestion = $scope.test.questions[$scope.current];
      if ($scope.current == $scope.test.maxQuestions) {
        checkAnswer(currentQuestion);
        return submitTest($scope.test);
      } else {
        if (currentQuestion.submitted) {
          checkAnswer(currentQuestion);

          currentQuestion.type = 'success';
          nextQuestion.type = '';

          $scope.current += 1;
          if ($scope.current === $scope.test.maxQuestions) {
            $scope.nextText = 'Submit';
          } else {
            $scope.nextText = 'Next';
          }

          $scope.question = nextQuestion;
        }
      }
    };

    $scope.previousQuestion = function() {
      $scope.current--;
      if ($scope.current !== $scope.test.maxQuestions) {
        $scope.nextText = 'Next';
      } else {
        $scope.nextText = 'Submit';
      }

      $scope.question = $scope.test.questions[($scope.current - 1)];

    };

    $scope.selectAnswer = function(answer) {
      $scope.test.questions[($scope.current - 1)].submitted = answer;
    };


    function getTest() {
      if (!StudentData.Tests.getTest()) {
        return $location.path('/test-expired');
      }
      $scope.test = StudentData.Tests.getTest();
    }
    function getUser() {
      if (!StudentData.getUser()) {
        return $location.path('/test-expired');
      }
      $scope.student = StudentData.getUser();
    }

    function submitTest(test) {
      $scope.disabled = true;
      StudentData.Tests.createTest($routeParams.studentId, test, function(err, data) {
        $location.path('/student/' + $routeParams.studentId + '/attempt/' + data.test._id);
      });
    }

    function checkAnswer(question) {
      if (question.submitted === question.correct) {
        question.result = 'correct';
        $scope.test.correctAnswers += 1;
      } else {
        question.result = 'incorrect';
      }
    }
  }
}
