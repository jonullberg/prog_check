'use strict';
module.exports = function (app) {
    app.directive('pcStudentGoalsList', [function () {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/templates/teacher/student_goals_list.html',
                link: function (scope, iElement, iAttrs) {
                },
                controller: 'StudentGoalsListCtrl'
            };
        }]);
};
