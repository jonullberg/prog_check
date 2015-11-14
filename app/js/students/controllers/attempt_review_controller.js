'use strict';

module.exports = function(app) {
  app.controller('AttemptReviewCtrl', ['$scope', '$sce', '$location', '$routeParams', 'StudentData', function($scope, $sce, $location, $routeParams, StudentData) {

    $scope.$on('test:changed', getTest);
    $scope.backToTests = function() {
      StudentData.Tests.setTest(null);
      $location.url('/student/' + $routeParams.studentId + '/tests');
    };
    $scope.init = init;

    function init() {
      getTest();
    }

    function getTest() {
      if (!StudentData.Tests.getTest()) {
        return $location.path('/test-expired');
      }
      $scope.attempt = StudentData.Tests.getTest();
    }
  }]);
};
