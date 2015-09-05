'use strict';

module.exports = function(app) {
  app.controller('QuestionCtrl', ['$scope', '$sce', function($scope, $sce) {

    $scope.trustAsHtml = $sce.trustAsHtml;

    $scope.select = function(answer, $index) {
      $scope.question.selectedIndex = $index;
      $scope.selectAnswer({answer: answer});
    };
  }]);
};
