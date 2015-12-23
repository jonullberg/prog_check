var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('ProgressReportCtrl', ['$scope', '$routeParams', 'TeacherData', progressReportCtrl]);
    function progressReportCtrl($scope, $routeParams, TeacherData) {
        var pr = this;
        pr.init = function () {
            getStudent();
        };
        function getStudent() {
            pr.student = TeacherData.Students.getStudent();
        }
    }
})(ProgCheck || (ProgCheck = {}));
