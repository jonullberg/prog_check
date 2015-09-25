'use strict';

module.exports = function(app) {
  app.controller('AttemptReviewCtrl', ['$scope', '$sce', '$location', 'Errors', 'Student', function($scope, $sce, $location, Errors, Student) {
    $scope.attempt = Student.attempt;

    $scope.backToTests = function() {
      $location.url('/student/tests');
    };
  }]);
};
