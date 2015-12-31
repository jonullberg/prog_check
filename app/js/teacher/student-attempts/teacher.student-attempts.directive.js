var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .directive('pcStudentAttempts', ['$filter', 'TeacherData', pcStudentAttempts]);
    function pcStudentAttempts($filter, TeacherData) {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/templates/teacher/student-attempts.tmpl.html',
            scope: {
                attempts: '=',
                student: '=',
                loaded: '='
            },
            link: function (scope, iElement, iAttrs) {
                scope.currentPage = 1;
                scope.viewBy = 5;
                scope.maxSize = 5;
                scope.itemsPerPage = scope.viewBy;
                scope.totalItems = scope.attempts.length;
                scope.dataLoaded = true;
                var totalAttempts = scope.attempts;
                scope.attempts = $filter('orderBy')(totalAttempts, '-dateTaken').slice(((scope.currentPage - 1) * scope.itemsPerPage), (scope.currentPage * scope.itemsPerPage));
                scope.changePage = function setPage(num) {
                    scope.currentPage = num;
                    var attempts = $filter('orderBy')(totalAttempts, '-dateTaken');
                    var beginning = (num - 1) * scope.itemsPerPage;
                    var end = num * scope.itemsPerPage;
                    scope.attempts = attempts.slice(beginning, end);
                };
            }
        };
    }
})(ProgCheck || (ProgCheck = {}));
