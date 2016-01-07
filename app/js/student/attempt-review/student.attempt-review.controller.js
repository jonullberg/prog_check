var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('AttemptReviewCtrl', ['$scope', '$sce', '$location', '$routeParams', 'StudentData', attemptReviewCtrl]);
    function attemptReviewCtrl($scope, $sce, $location, $routeParams, StudentData) {
        $scope.$on('test:changed', getTest);
        var ar = this;
        ar.backToTests = function () {
            StudentData.Tests.setTest(null);
            $location.url('/student/' + $routeParams.studentId + '/tests');
        };
        ar.init = function () {
            getTest();
        };
        function getTest() {
            ar.attempt = StudentData.Tests.getTest();
        }
    }
})(ProgCheck || (ProgCheck = {}));
