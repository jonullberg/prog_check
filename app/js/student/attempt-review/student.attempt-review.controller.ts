/**
 * The Controller for a students attempt review
 * For use in the Prog Check testing Application
 * Created by Jonathan Ullberg on 12/02/2015
 * /app/js/student/attempt-review/student.attempt-review.controller.ts
 */

module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .controller('AttemptReviewCtrl', ['$scope', '$sce', '$location', '$routeParams', 'StudentData', attemptReviewCtrl])

  function attemptReviewCtrl($scope: any, $sce: any, $location: any, $routeParams: any, StudentData: any) {

    $scope.$on('test:changed', getTest);

    var ar = this;
    // Public Functions
    ar.backToTests = function() {
      StudentData.Tests.setTest(null);
      $location.url('/student/' + $routeParams.studentId + '/tests');
    };

    ar.init = function() {
      getTest();
    };

    // Private Functions
    function getTest() {
      ar.attempt = StudentData.Tests.getTest();
    }
  }
}
