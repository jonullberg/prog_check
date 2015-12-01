'use strict';

module.exports = function(app) {
  app.controller('SingleTestCtrl', ['$scope', '$uibModal', '$rootScope', '$location', '$routeParams', '$sce', 'AdminData', 'SanitizeFractions', function($scope, $uibModal, $rootScope, $location, $routeParams, $sce, AdminData, SanitizeFractions) {
    $scope.isDeleteShown = false;
    $scope.init = init;

    $scope.trustAsHtml = $sce.trustAsHtml;
    $scope.$on('test:changed', getTest);

    /**
     * Will set selected test to null and send us back to test list
     */
    $scope.goBack = function() {
      AdminData.Tests.setTest(null);
      $location.path('/admin/standards/' + $routeParams.standardId);
    };

    /**
     * Will open a modal that allows user to input a new test
     * @param  {object} test The test that will be edited in form
     */
    $scope.editTest = function(test) {
      AdminData.Tests.setTest(test);
      var scope = $rootScope.$new();
      scope.params = {
        formType: 'editing',
        buttonText: 'Save Test'
      };
      $uibModal.open({
        animation: true,
        templateUrl: '/templates/directives/test_form.html',
        controller: 'TestFormCtrl',
        size: 'lg',
        scope: scope
      });
    };
    $scope.addQuestion = function() {
      AdminData.Tests.setQuestion(null);
      var scope = $rootScope.$new();
      scope.params = {
        formType: 'creating',
        buttonText: 'Add Question'
      };
      var templateUrl;
      var controller;
      if ($scope.test.questionType === 'text') {
        templateUrl = '/templates/admin/modals/question_form_modal.html';
        controller = 'QuestionFormCtrl';
      } else if ($scope.test.questionType === 'image') {
        templateUrl = '/templates/admin/modals/image_question_form_modal.html';
        controller = 'ImageQuestionFormCtrl';
      }
      $uibModal.open({
        animation:true,
        templateUrl: templateUrl,
        controller: controller,
        size: 'lg',
        scope: scope
      });

    };
    $scope.editQuestion = function(question) {
      AdminData.Tests.setQuestion(question);
      var scope = $rootScope.$new();
      scope.params = {
        formType: 'editing',
        buttonText: 'Save Question'
      };
      var templateUrl;
      var controller;
      if ($scope.test.questionType === 'text') {
        templateUrl = '/templates/admin/modals/question_form_modal.html';
        controller = 'QuestionFormCtrl';
      } else if ($scope.test.questionType === 'image') {
        templateUrl = '/templates/admin/modals/image_question_form_modal.html';
        controller = 'ImageQuestionFormCtrl';
      }
      $uibModal.open({
        animation:true,
        templateUrl: templateUrl,
        controller: controller,
        size: 'lg',
        scope: scope
      });
    };
    $scope.deleteTest = function(test) {
      AdminData.Tests.deleteTest(test._id);
      $location.path('/admin/standards/' + $scope.standard._id);
    };

    $scope.toggleDelete = function() {
      $scope.isDeleteShown = !$scope.isDeleteShown;
    };


    function showAnswers(question) {
      question.showing = true;
    }

    function hideAnswers(question) {
      question.showing = false;
    }

    $scope.showAnswers = function(question) {
      $scope.test.questions.forEach(function(question) {
        question.showing = false;
      });
      question.showing = !question.showing;
    };

    $scope.showAnswerImages = function(question) {
      question.imageButtonsShowing = !question.imageButtonsShowing;
    };

    $scope.deleteQuestion = function(question) {
      AdminData.Tests.deleteQuestion($scope.test._id, question._id, function(err) {
      });
    };
    function init() {
      getStandard();
      getTest();
    }
    function getStandard() {
      var standard = AdminData.Standards.getStandard();
      if (standard) {
        $scope.standard = standard;
      } else {
        AdminData.Standards.fetchStandard($routeParams.standardId, function(err, data) {
          $scope.standard = data.standard;
        });
      }
    }
    function getTest() {
      var test = AdminData.Tests.getTest();
      if (test) {
        $scope.test = AdminData.Tests.getTest();
      } else {
        AdminData.Tests.fetchTest($routeParams.testId, function(err, data) {
          $scope.test = data.test;
        });
      }
    }
  }]);
};
