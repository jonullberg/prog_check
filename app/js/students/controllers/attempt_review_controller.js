'use strict';

module.exports = function(app) {
  app.controller('AttemptReviewCtrl', ['$scope', 'Errors', 'Student', function($scope, Errors, Student) {
    $scope.attempt = Student.attempt;
  }]);
};
