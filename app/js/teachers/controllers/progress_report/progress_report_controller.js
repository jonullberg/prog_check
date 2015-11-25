'use strict';
var progressReportController = function (app) {
    app.controller('ProgressReportCtrl', ['$scope', '$routeParams', 'TeacherData', function ($scope, $routeParams, TeacherData) {
            $scope.init = init;
            $scope.$on('results:changed', getResults);
            function init() {
                getResults();
                getStudent();
            }
            function getResults() {
                $scope.results = TeacherData.Attempts.getResults();
            }
            function getStudent() {
                $scope.student = TeacherData.Students.getStudent();
            }
        }]);
};
module.exports = progressReportController;
