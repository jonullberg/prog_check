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
    // export = function(app: any) {
    //   app.controller('AttemptReviewCtrl', ['$scope', '$sce', '$location', '$routeParams', 'StudentData', attemptReviewCtrl]);
    // };
    function attemptReviewCtrl($scope, $sce, $location, $routeParams, StudentData) {
        $scope.$on('test:changed', getTest);
        // Public Functions
        $scope.backToTests = function () {
            StudentData.Tests.setTest(null);
            $location.url('/student/' + $routeParams.studentId + '/tests');
        };
        $scope.init = function () {
            getTest();
        };
        // Private Functions
        function getTest() {
            if (!StudentData.Tests.getTest()) {
                return $location.path('/test-expired');
            }
            $scope.attempt = StudentData.Tests.getTest();
        }
    }
})(ProgCheck || (ProgCheck = {}));
