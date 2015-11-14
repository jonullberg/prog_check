'use strict';

module.exports = function(app) {
  app.controller('StudentTestCtrl', ['$scope', '$routeParams', '$location', 'StudentData', function($scope, $routeParams, $location, StudentData) {
    $scope.$on('student:changed', getStudent);
    $scope.$on('test:changed', getTest);
    $scope.init = init;
    $scope.nextText = 'Next';

    $scope.nextQuestion = function() {
      var currentQuestion = $scope.test.questions[$scope.current - 1];
      var nextQuestion = $scope.test.questions[$scope.current];
      if ($scope.current === $scope.test.maxQuestions) {
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

    function init() {
      getStudent();
      getTest();
      $scope.current = 1;
      $scope.question = $scope.test.questions[0];
    }
    function getTest() {
      if (!StudentData.Tests.getTest()) {
        return $location.path('/test-expired');
      }
      $scope.test = StudentData.Tests.getTest();
    }
    function getStudent() {
      if (!StudentData.getStudent()) {
        return $location.path('/test-expired');
      }
      $scope.student = StudentData.getStudent();
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

  }]);
};
