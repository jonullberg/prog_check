'use strict';

module.exports = function(app) {
  app.controller('QuestionCtrl', ['$scope', '$modalInstance', 'Tests', function($scope, $modalInstance, Tests) {

    var getTest = function() {
      $scope.test = Tests.test;
    }
    $scope.$on('test:changed', getTest());

    $scope.save = function(question) {
      question.answers = Object.keys(question.answers)
        .map(function(key) {
          return question.answers[key];
        });
      Tests.addQuestion(question, function(err) {
        if (err) {
          return Errors.addError({
            'msg': 'Failed to save question'
          });
        }
      });
      $scope.question = null;
    };

    $scope.cancel = function() {
      $modalInstance.dismiss();
    };

  }]);
};
