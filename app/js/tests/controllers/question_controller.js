'use strict';

module.exports = function(app) {
  app.controller('QuestionCtrl', ['$scope', '$modalInstance', 'Tests', 'Upload', function($scope, $modalInstance, Tests, Upload) {

    var getTest = function() {
      $scope.test = Tests.test;
    }
    $scope.$on('test:changed', getTest());

    var upload = function(file) {
      Upload.upload({
        url: 'api/questions/images'
      });
    }

    $scope.$watch('question.question', function(file) {
      upload($scope.question.question);
    })

    $scope.showTest = function(test) {
      console.log(test);
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
      if ($scope.test.questionType === 'image') {
        console.log('You are trying to save an image');
      }
      if ($scope.params.formType === 'creating') {
        question.answers = Object.keys(question.answers)
          .map(function(key) {
            return question.answers[key];
          });
        addQuestion(question);
      } else if ($scope.params.formType === 'editing') {
        saveQuestion(question);
        $modalInstance.close();
      }
      $scope.question = null;
    };

    $scope.cancel = function() {
      $modalInstance.dismiss();
    };

  }]);
};
