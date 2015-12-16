/**
 * ~/js/admin/controllers/question_controller.js
 * A controller to deal with editing and adding questions
 */
'use strict';

module.exports = function(app) {
  app.controller('QuestionFormCtrl', ['$scope', '$uibModalInstance', '$sce', '$routeParams', 'AdminData', 'Upload', function($scope, $uibModalInstance, $sce, $routeParams, AdminData, Upload) {


    $scope.trustAsHtml = $sce.trustAsHtml;
    $scope.$on('test:changed', getTest);

    // Public Functions
    $scope.init = function() {
      getTest();
      if (AdminData.Tests.getQuestion()) {
        getQuestion();
      }
    };

    $scope.save = function(question) {
      if ($scope.params.formType === 'creating') {
        question.answers = Object.keys(question.answers)
          .map(function(key) {
            return question.answers[key];
          });
        createQuestion(question);
        AdminData.Tests.setQuestion(null);
      } else if ($scope.params.formType === 'editing') {
        updateQuestion(question);
        AdminData.Tests.setQuestion(null);
      }
      $uibModalInstance.close();
    };
    $scope.cancel = function() {
      $uibModalInstance.dismiss();
    };

    // Private Functions
    function getQuestion() {
      $scope.question = AdminData.Tests.getQuestion();
    }
    function getTest() {
      $scope.test = AdminData.Tests.getTest();
    }
    function createQuestion(question) {
      AdminData.Tests.createQuestion($routeParams.testId, question);
    }

    function updateQuestion(question) {
      AdminData.Tests.updateQuestion($routeParams.testId, question);
    }

  }]);
};
