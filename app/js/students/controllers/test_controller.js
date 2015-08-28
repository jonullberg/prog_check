'use strict';

module.exports = function(app) {
  app.controller('TestCtrl', ['$scope', '$routeParams', 'Errors', 'Student', 'shuffle', function($scope, $routeParams, Errors, Student, shuffle) {
    var student = Student.student;

    $scope.max = Student.student.numberOfQuestions;

    $scope.current = 1;

    $scope.nextText = 'Next';
    $scope.nextQuestion = function() {
      $scope.current += 1;
      if ($scope.current === $scope.max) {
        $scope.nextText = 'Submit';
      } else {
        $scope.nextText = 'Next';
      }

    };

    $scope.previousQuestion = function() {
      $scope.current--;
      if ($scope.current !== $scope.max) {
        $scope.nextText = 'Next';
      } else {
        $scope.nextText = 'Submit';
      }
    };

    var testId = $routeParams.testId;

    var test = Student.getTest(testId, function(err, data) {
      if (err) {
        return Errors.addError({
          'msg': 'There was an error getting your test'
        });
      }
      prepareAttempt(data[0], student);
      return data[0];
    });

    function prepareAttempt(test, student) {
      Student.attempt.testId = testId;
      Student.attempt.studentId = student._id;
      Student.attempt.questions = getQuestions(test.questions, student.numberOfQuestions);
    }

    function getQuestions(questions, num) {
      var questionsArray;
      questions = shuffle.shuffle(questions);
      questionsArray = questions.slice(0, num);
      return questionsArray;
    }

    function prepareQuestion(question) {
      var answers;
      answers = shuffle.shuffle(question.answers);
      return answers;
    }

    Student.test = test;






  }]);
};
