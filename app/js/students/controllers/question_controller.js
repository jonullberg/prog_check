'use strict';

module.exports = function(app) {
  app.controller('QuestionCtrl', ['$scope', function ($scope) {

    $scope.select = function(answer, $index) {
      $scope.question.selectedIndex = $index;
      $scope.selectAnswer({answer: answer});
    };
  }]);
};
