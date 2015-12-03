'use strict';
module.exports = function (app) {
    app.directive('pcStudentAttempts', [function () {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: '/templates/teacher/student_attempts.html',
                controller: 'StudentAttemptsCtrl',
                scope: {
                    attempts: '='
                },
                link: function (scope, iElement, iAttrs) {
                }
            };
        }]);
};
