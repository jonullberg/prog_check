'use strict';

module.exports = function(app) {
  app.controller('SingleTestCtrl', ['$scope', '$modal', '$rootScope', '$sce', 'Tests', 'Standards', 'Errors', 'SanitizeFractions', function($scope, $modal, $rootScope, $sce, Tests, Standards, Errors, SanitizeFractions) {
    $scope.isDeleteShown = false;
    $scope.getTest = function() {
      $scope.test = Tests.test;
    };

    $scope.trustAsHtml = $sce.trustAsHtml;
    $scope.$on('test:changed', $scope.getTest);

    /**
     * Will set selected test to null and send us back to test list
     */
    $scope.goBack = function() {
      Tests.removeTest();
      $scope.toggleSingleTest();
    };

    /**
     * Will open a modal that allows user to input a new test
     * @param  {object} test The test that will be edited in form
     */
    $scope.editTest = function(test) {
      var scope = $rootScope.$new();
      scope.params = {
        formType: 'editing',
        buttonText: 'Save Test'
      };
      $modal.open({
        animation: true,
        templateUrl: '/templates/directives/test_form.html',
        controller: 'TestFormCtrl',
        size: 'lg',
        scope: scope
      });
    };

    $scope.deleteTest = function(test) {
      Tests.removeTest();
      Tests.deleteTest(test, function(err) {
        if (err) {
          return Errors.addError({
            'msg': 'Failed to delete test'
          });
        }
      });
      $scope.toggleSingleTest();
    };

    $scope.toggleDelete = function() {
      $scope.isDeleteShown = !$scope.isDeleteShown;
    };
    $scope.addQuestions = function() {
      var scope = $rootScope.$new();
      scope.params = {
        formType: 'creating',
        buttonText: 'Add Question'
      };
      $modal.open({
        animation:true,
        templateUrl: '/templates/partials/question_form.html',
        controller:'QuestionFormCtrl',
        size: 'lg',
        scope: scope
      });
    };

    var showAnswers = function(question) {
      question.showing = true;
    };

    var hideAnswers = function(question) {
      question.showing = false;
    };

    $scope.showAnswers = function(question) {
      question.showing = !question.showing;
    };

    $scope.showAnswerImages = function(question) {
      question.imageButtonsShowing = !question.imageButtonsShowing;
    };

    $scope.editQuestion = function(question) {
      var scope = $rootScope.$new();
      scope.params = {
        formType: 'editing',
        buttonText: 'Save Question'
      };
      scope.question = question;
      $modal.open({
        animation:true,
        templateUrl: '/templates/partials/question_form.html',
        controller:'QuestionCtrl',
        size: 'lg',
        scope: scope
      });
    };

    $scope.deleteQuestion = function(question) {
      Tests.deleteQuestion(question, function(err) {
        if (err) {
          return Errors.addError({
            'msg': 'Failed to delete question'
          });
        }
      });
    };
  }]);
};
