'use strict';

module.exports = function(app) {
  app.controller('AttemptReviewCtrl', ['$scope', '$sce', 'Errors', 'Student', function($scope, $sce, Errors, Student) {
    $scope.attempt = Student.attempt;
    $scope.trustAsHtml = $sce.trustAsHtml;
  }]);
};
