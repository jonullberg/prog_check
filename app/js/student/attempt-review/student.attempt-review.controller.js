/**
 * The Controller for a students attempt review
 * For use in the Prog Check testing Application
 * Created by Jonathan Ullberg on 12/02/2015
 * /app/js/student/attempt-review/student.attempt-review.controller.ts
 */
var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('AttemptReviewCtrl', ['$scope', '$sce', '$location', '$routeParams', 'StudentData', attemptReviewCtrl]);
    function attemptReviewCtrl($scope, $sce, $location, $routeParams, StudentData) {
        $scope.$on('test:changed', getTest);
        var ar = this;
        // Public Functions
        ar.backToTests = function () {
            StudentData.Tests.setTest(null);
            $location.url('/student/' + $routeParams.studentId + '/tests');
        };
        ar.init = function () {
            getTest();
        };
        // Private Functions
        function getTest() {
            if (!StudentData.Tests.getTest()) {
                return $location.path('/test-expired');
            }
            ar.attempt = StudentData.Tests.getTest();
        }
    }
})(ProgCheck || (ProgCheck = {}));
