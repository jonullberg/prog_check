/**
 * ~/js/admin/controllers/question_controller.js
 * A controller to deal with editing and adding questions
 */
'use strict';

module.exports = function(app) {
  app.controller('QuestionFormCtrl', ['$scope', '$uibModalInstance', '$sce', '$routeParams', 'AdminData', 'Upload', function($scope, $uibModalInstance, $sce, $routeParams, AdminData, Upload) {

    $scope.init = init;
    $scope.trustAsHtml = $sce.trustAsHtml;
    $scope.$on('test:changed', getTest);

    if ($scope.params.formType === 'creating') {
      $scope.save = function(question) {
        question.answers = Object.keys(question.answers)
          .map(function(key) {
            return question.answers[key];
          });
        createQuestion(question);
        AdminData.Tests.setQuestion(null);
        $uibModalInstance.close();
      };
    }

    if ($scope.params.formType === 'editing') {
      $scope.save = function(question) {
        updateQuestion(question);
        AdminData.Tests.setQuestion(null);
        $uibModalInstance.close();
      };
    }

    $scope.cancel = function() {
      $uibModalInstance.dismiss();
    };
    function init() {
      getTest();
      getQuestion();
    }
    function getQuestion() {
      $scope.question = AdminData.Tests.getQuestion();
    }
    function getTest() {
      $scope.test = AdminData.Tests.getTest();
    }
    function createQuestion(question) {
      AdminData.Tests.createQuestion($routeParams.testId, question, function(err, data) {
      });
    }

    function updateQuestion(question) {
      AdminData.Tests.updateQuestion($routeParams.testId, question, function(err, data) {
      });
    }

  }]);
};
