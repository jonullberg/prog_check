'use strict';
module.exports = function (app) {
    app.directive('pcGoalForm', function () {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/templates/directives/standards/goal_form.html',
            scope: {
                save: '&',
                goal: '='
            }
        };
    });
};
