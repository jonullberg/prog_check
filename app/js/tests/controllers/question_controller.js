'use strict';

module.exports = function(app) {
  app.controller('QuestionCtrl', ['$scope', '$modalInstance', '$sce', 'Errors', 'Tests', 'Upload', function($scope, $modalInstance, $sce, Errors, Tests, Upload) {

    var getTest = function() {
      $scope.test = Tests.test;
    };

    $scope.initQuestion = function() {
      getTest();
      $scope.question = {
        question: null,
        correct: null,
        answers: []

      };
    };

    $scope.trustAsHtml = $sce.trustAsHtml;

    $scope.$on('test:changed', getTest);

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
        fields: {
          'testField': 'This is a test'
        },
        file: file
      }).success(function(data, status, headers, config) {
        cb(data.filePath);
      });
    };

    var addQuestion = function(question) {
      Tests.addQuestion(question, function(err) {
        if (err) {
          return Errors.addError({
            'msg': 'Failed to save question'
          });
        }
      });
    };

    var saveQuestion = function(question) {
      Tests.saveQuestion(question, function(err) {
        if (err) {
          return Errors.addError({
            'msg': 'Failed to save question'
          });
        }
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

  }]);
};
