var ProgCheck;
(function (ProgCheck) {
    angular
        .module('progCheck')
        .directive('pcAttemptQuestion', pcAttemptQuestion);
    function pcAttemptQuestion() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/templates/teacher/attempt-question.tmpl.html',
            scope: {
                question: '='
            },
            link: function (scope, iElement, iAttr) {
            }
        };
    }
})(ProgCheck || (ProgCheck = {}));
