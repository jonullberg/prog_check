/**
 * ~/js/admin/controllers/question_controller.js
 * A controller to deal with editing and adding questions
 */
'use strict';

var config = require('./config/config.js');

module.exports = function(app) {
  app.controller('ImageQuestionFormCtrl', ['$scope', '$uibModalInstance', '$sce', '$http', 'Errors', 'AdminData', 'Upload', function($scope, $uibModalInstance, $sce, $http, Errors, AdminData, Upload) {

    $scope.init = init;
    $scope.trustAsHtml = $sce.trustAsHtml;
    $scope.$on('test:changed', getTest);


    $scope.$watch('questionImage', function(file) {
      $scope.upload(file, function(filePath) {
        $scope.question.question = (process.env.AWS_GET_URL || config.AWS_GET_URL) + filePath;
      });
    });
    $scope.$watch('correctImage', function(file) {
      $scope.upload(file, function(filePath) {
        $scope.question.correct = (process.env.AWS_GET_URL || config.AWS_GET_URL) + filePath;
        $scope.question.answers[0] = (process.env.AWS_GET_URL || config.AWS_GET_URL) + filePath;
      });
    });
    $scope.$watch('answersImage1', function(file) {
      $scope.upload(file, function(filePath) {
        $scope.question.answers[1] = (process.env.AWS_GET_URL || config.AWS_GET_URL) + filePath;
      });
    });
    $scope.$watch('answersImage2', function(file) {
      $scope.upload(file, function(filePath) {
        $scope.question.answers[2] = (process.env.AWS_GET_URL || config.AWS_GET_URL) + filePath;
      });
    });
    $scope.$watch('answersImage3', function(file) {
      $scope.upload(file, function(filePath) {
        $scope.question.answers[3] = (process.env.AWS_GET_URL || config.AWS_GET_URL) + filePath;
      });
    });
    $scope.upload = function(file, cb) {
      var storeAuth = $http.defaults.headers.common.Authorization;
      delete $http.defaults.headers.common.Authorization;
      if (file && file.name) {
        var filename = Math.round(Math.random()*10000) + file.name
        Upload.upload({
          url: process.env.AWS_URL || config.AWS_URL,
          method: 'POST',
          data: {
            'key' : filename,
            'acl' : 'public-read',
            'Content-Type' : file.type,
            'AWSAccessKeyId' : process.env.AWS_ACCESS_KEY || config.AWS_ACCESS_KEY,
            'Policy' : process.env.AWS_POLICY || config.AWS_POLICY,
            'Signature' : process.env.AWS_SIGNATURE || config.AWS_SIGNATURE,
            'filename': filename
          },
          'file': file
        })
        .then(function(response) {
          cb(filename);
        });
        $http.defaults.headers.common.Authorization;
      }
    };

    $scope.save = function(question) {
      if ($scope.params.formType === 'creating') {
        question.answers = Object.keys(question.answers)
          .map(function(key) {
            return question.answers[key];
          });
        createQuestion(question);
      } else if ($scope.params.formType === 'editing') {
        saveQuestion(question);
      }
      $uibModalInstance.close();
    };

    $scope.cancel = function() {
      $uibModalInstance.dismiss();
    };
    function init() {
      getTest();
      getQuestion();
    }
    function getQuestion() {
      if ($scope.params.formType === 'creating') {
        $scope.question = {
          question: null,
          correct: null,
          answers: [null, null, null]
        }
      } else {
        $scope.question = AdminData.Tests.getQuestion();
      }
    }
    function getTest() {
      $scope.test = AdminData.Tests.getTest();
    }
    function createQuestion(question) {
      AdminData.Tests.createQuestion($scope.test._id, question, function(err) {
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
