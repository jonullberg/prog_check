/**
 * A Controller for the Progress Report for Teachers viewing a student's goal
 * For use in the Prog Check testing application
 * Created by Jonathan Ullberg on 12/15/2015
 */
var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('ProgressReportCtrl', ['$scope', '$routeParams', 'TeacherData', progressReportCtrl]);
    function progressReportCtrl($scope, $routeParams, TeacherData) {
        var pr = this;
        $scope.$on('results:changed', getResults);
        // Public Functions
        pr.init = function () {
            getResults();
            getStudent();
        };
        // Private Functions
        function getResults() {
            pr.results = TeacherData.Attempts.getResults();
        }
        function getStudent() {
            pr.student = TeacherData.Students.getStudent();
        }
    }
})(ProgCheck || (ProgCheck = {}));
