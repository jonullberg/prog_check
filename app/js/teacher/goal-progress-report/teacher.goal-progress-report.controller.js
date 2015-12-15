var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('ProgressReportCtrl', ['$scope', '$routeParams', 'TeacherData', progressReportCtrl]);
    function progressReportCtrl($scope, $routeParams, TeacherData) {
        var pr = this;
        $scope.$on('results:changed', getResults);
        pr.init = function () {
            getResults();
            getStudent();
        };
        function getResults() {
            pr.results = TeacherData.Attempts.getResults();
        }
        function getStudent() {
            pr.student = TeacherData.Students.getStudent();
        }
    }
})(ProgCheck || (ProgCheck = {}));
