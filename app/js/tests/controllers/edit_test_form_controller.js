'use strict';

module.exports = function(app) {
  app.controller('EditTestCtrl', ['$scope', '$modalInstance', 'Tests', 'dataStore', function($scope, $modalInstance, Tests, dataStore) {

    $scope.test = Tests.test;
    $scope.standard = dataStore.standard;

    $scope.setGoal = function(test) {
      test._goal = test.goalId;
    };

    $scope.save = function(test) {
      test.questions = [];
      Tests.saveTest(test, function(err) {
        if (err) {
          console.log(err);
        }
      });
      $modalInstance.close();
    };

    $scope.cancel = function(test) {
      dataStore.test = null;
      $modalInstance.dismiss();
    };

    $scope.newQuestions = function(test) {
      $scope.areWeAddingQuestions = true;
      if (!test.questions) {
        test.questions = [];
      }
    };

    $scope.addQuestion = function(question) {
      question.answers = Object.keys(question.answers)
        .map(function(key) {
          return question.answers[key];
        });
      dataStore.test = $scope.test;
      dataStore.addQuestion(question);
      $scope.question = {};
      $scope.areWeAddingQuestions = false;
    };

    $scope.editQuestion = function(question) {
      $scope.areWeAddingQuestions = false;
      question.editing = true;
      $scope.master = angular.copy(question);
      $scope.question = question;
    };
    $scope.cancelQuestion = function(question) {
      angular.copy($scope.master, question);
      question.editing = false;
      $scope.question = {};
    };
  }]);
};
