var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .directive('pcStudentGoalsList', pcStudentGoalsList);
    function pcStudentGoalsList() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/js/teacher/student-goals-list/student-goals-list.html',
            link: function (scope, iElement, iAttrs) {
            },
            controller: 'StudentGoalsListCtrl'
        };
    }
})(ProgCheck || (ProgCheck = {}));
