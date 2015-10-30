/**
 * ~/js/admin/controllers/question_controller.js
 * A controller to deal with editing and adding questions
 */
'use strict';

module.exports = function(app) {
  app.controller('ImageQuestionFormCtrl', ['$scope', '$modalInstance', '$sce', 'Errors', 'AdminData', 'Upload', function($scope, $modalInstance, $sce, Errors, AdminData, Upload) {

    $scope.init = init;
    $scope.trustAsHtml = $sce.trustAsHtml;
    $scope.$on('test:changed', getTest);

    if ($scope.params.formType === 'creating') {

    }

    $scope.$watch('questionImage', function(file) {
      $scope.upload(file, function(filePath) {
        $scope.question.question = filePath;
      });
    });
    $scope.$watch('correctImage', function(file) {
      $scope.upload(file, function(filePath) {
        $scope.question.correct = filePath;
        $scope.question.answers[0] = filePath;
      });
    });
    $scope.$watch('answersImage1', function(file) {
      $scope.upload(file, function(filePath) {
        $scope.question.answers[1] = filePath;
      });
    });
    $scope.$watch('answersImage2', function(file) {
      $scope.upload(file, function(filePath) {
        $scope.question.answers[2] = filePath;
      });
    });
    $scope.$watch('answersImage3', function(file) {
      $scope.upload(file, function(filePath) {
        $scope.question.answers[3] = filePath;
      });
    });
    $scope.upload = function(file, cb) {
      Upload.upload({
        url: 'api/tests/' + $scope.test._id + '/questions/image',
        method: 'POST',
        data: {

        },
        fields: {
          'testField': 'This is a test'
        },
        file: file
      }).success(function(data, status, headers, config) {
        cb(data.filePath);
      });
    };

    $scope.save = function(question) {
      if ($scope.params.formType === 'creating') {
        question.answers = Object.keys(question.answers)
          .map(function(key) {
            return question.answers[key];
          });
        addQuestion(question);
      } else if ($scope.params.formType === 'editing') {
        saveQuestion(question);
      }
      $modalInstance.close();
    };

    $scope.cancel = function() {
      $modalInstance.dismiss();
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
      AdminData.Tests.createQuestion(question, function(err) {
        if (err) {
          return Errors.addError({
            'msg': 'Failed to save question'
          });
        }
      });
    };

    function updateQuestion(question) {
      AdminData.Tests.updateQuestion(question, function(err) {
        if (err) {
          return Errors.addError({
            'msg': 'Failed to save question'
          });
        }
      });
    }

  }]);
};
