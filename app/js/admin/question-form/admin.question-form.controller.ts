/**
 * ~/js/admin/controllers/question_controller.js
 * A controller to deal with editing and adding questions
 * For use in the Prog Check testing application
 * Created by Jonathan Ullberg on 08/10/2015
 */
 /// <reference path="../../../../tools/typings/tsd.d.ts" />

module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .controller('QuestionFormCtrl', ['$scope', '$uibModalInstance', '$sce', '$routeParams', 'AdminData', questionFormCtrl]);

  function questionFormCtrl($scope, $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance, $sce: ng.ISCEService, $routeParams, AdminData) {

    var qf = this;
    $scope.trustAsHtml = $sce.trustAsHtml;
    $scope.$on('test:changed', getTest);

    // Public Functions
    $scope.init = function() {
      getTest();
      getQuestion();
    };
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

    }
}
