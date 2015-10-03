'use strict';

module.exports = function(app) {
  app.controller('TestCtrl', ['$scope', '$routeParams', '$location', 'Errors', 'Student', 'shuffle', function($scope, $routeParams, $location, Errors, Student, shuffle) {
    var student = Student.student;
    var testId = $routeParams.testId;
    console.log(Student);

    $scope.current = 1;

    Student.getTest(testId, function(err, data) {
      if (err) {
        return Errors.addError({
          'msg': 'There was an error getting your test'
        });
      }
      var attempt = prepareAttempt(data[0], student);
      $scope.attempt = attempt;
      $scope.question = attempt.questions[($scope.current - 1)];
      $scope.attempt.questions[$scope.current - 1].type = '';
      return attempt;
    });


    $scope.max = function() {
      var maxQuestions;
      if (Student){
        Student.student.numberOfQuestions;
      }
    };


    $scope.nextText = 'Next';

    $scope.nextQuestion = function() {
      var currentQuestion = $scope.attempt.questions[$scope.current - 1];
      var nextQuestion = $scope.attempt.questions[$scope.current];
      if ($scope.current === $scope.max) {
        checkAnswer(currentQuestion);
        return submitTest($scope.attempt);
      } else {
        if (currentQuestion.submitted) {
          checkAnswer(currentQuestion);

          currentQuestion.type = 'success';
          nextQuestion.type = '';

          $scope.current += 1;
          if ($scope.current === $scope.max) {
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

      if ($scope.current !== $scope.max) {
        $scope.nextText = 'Next';
      } else {
        $scope.nextText = 'Submit';
      }

      $scope.question = $scope.attempt.questions[($scope.current - 1)];

    };

    $scope.getNumber = function(num) {
      return new Array(num);
    };

    $scope.selectAnswer = function(answer) {
      $scope.attempt.questions[($scope.current - 1)].submitted = answer;
    };

    function prepareAttempt(test, student) {

      var questions = getQuestions(test.questions, student.numberOfQuestions);
      return {
        testId: testId,
        studentId: student._id,
        correctAnswers: 0,
        questions: questions,
        directions: test.testDirections
      };
    }

    function getQuestions(questions, num) {
      var questionsArray;
      questions = shuffle.shuffle(questions);
      questionsArray = questions.slice(0, num);
      questionsArray.forEach(function(question) {
        question.answers = prepareQuestion(question);
        question.type = 'info';
        return question;
      });
      return questionsArray;
    }

    function prepareQuestion(question) {
      var answers;
      answers = shuffle.shuffle(question.answers);
      return answers;
    }

    function submitTest(attempt) {
      Student.saveAttempt(attempt, function(err, data) {
        if (err) {
          return Errors.addError({
            'msg': 'There was an error saving your'
          });
        }
        $location.path('/student/attempt');
      });
    }


    function checkAnswer(question) {
      if (question.submitted === question.correct) {
        question.result = 'correct';
        $scope.attempt.correctAnswers += 1;
      } else {
        question.result = 'incorrect';
      }
    }




  }]);
};
