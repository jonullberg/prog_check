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
    qf.trustAsHtml = $sce.trustAsHtml;
    $scope.$on('test:changed', getTest);

    // Public Functions
    qf.init = function() {
      getTest();
      if (AdminData.Tests.getQuestion()) {
        getQuestion();
      }
    };

    qf.save = function(question) {
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
    }

    qf.cancel = function() {
      console.log('cancel');
      $uibModalInstance.dismiss();
    };

    // Private Functions
    function getQuestion() {
      qf.question = AdminData.Tests.getQuestion();
    }
    function getTest() {
      qf.test = AdminData.Tests.getTest();
    }
    function createQuestion(question) {
      AdminData.Tests.createQuestion($routeParams.testId, question);
    }

    function updateQuestion(question) {
      AdminData.Tests.updateQuestion($routeParams.testId, question);
    }

  }
}
