'use strict';
function attemptReviewCtrl($scope, $sce, $location, $routeParams, StudentData) {
    $scope.$on('test:changed', getTest);
    $scope.backToTests = function () {
        StudentData.Tests.setTest(null);
        $location.url('/student/' + $routeParams.studentId + '/tests');
    };
    $scope.init = function () {
        getTest();
    };
    function getTest() {
        if (!StudentData.Tests.getTest()) {
            return $location.path('/test-expired');
        }
        $scope.attempt = StudentData.Tests.getTest();
    }
}
module.exports = function (app) {
    app.controller('AttemptReviewCtrl', ['$scope', '$sce', '$location', '$routeParams', 'StudentData', attemptReviewCtrl]);
};
