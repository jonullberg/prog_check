/**
 * For use in the Prog Check testing application
 * A controller for dealing with displaying a single students most recent attempts
 * Created by Jonathan Ullberg on 10/23/2015
 */
'use strict';

module.exports = function(app) {
  app.controller('StudentAttemptsCtrl', ['$scope', '$filter', 'TeacherData', function ($scope, $filter, TeacherData) {
    $scope.init = init;
    $scope.showAttempt = function(attempt) {
      $scope.attempts.forEach(function(attempt) {
        attempt.questionsShowing = false;
      });
      attempt = setAttemptStyling(attempt);
      attempt.questionsShowing = true;
    };
    $scope.showAnswers = function(attempt, question) {
      attempt.questions.forEach(function(question) {
        question.answersShowing = false;
      });
      question.answersShowing = true;
    };
    $scope.setPage = setPage;
    $scope.currentPage = 1;
    $scope.quantity = 5;
    function init() {
      getAttempts();
    }
    function setPage(pageNo) {
      $scope.attempts = $scope.totalAttempts.slice((pageNo - 1) * $scope.quantity, (pageNo * $scope.quantity));
    }
    function getAttempts() {
      $scope.totalAttempts = $filter('orderBy')(TeacherData.Attempts.getAttempts(), '-dateTaken');
      $scope.attempts = $scope.totalAttempts.slice(($scope.currentPage - 1) * $scope.quantity, ($scope.currentPage * $scope.quantity));
    }

    function setAttemptStyling(attempt) {
      attempt.questions.forEach(function(question) {
        if (question.result === 'correct') {
          question.icon = 'glyphicon glyphicon-ok green';
          question.color = 'green';
        } else {
          question.icon = 'glyphicon glyphicon-remove red';
          question.color = 'red';
        }
      });
      return attempt;
    }

  }]);
};
