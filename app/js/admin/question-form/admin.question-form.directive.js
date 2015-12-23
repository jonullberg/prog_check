var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .directive('pcQuestionForm', pcQuestionForm);
    function pcQuestionForm() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: '/templates/admin/question-form.html',
            scope: {
                formType: '=',
                buttonText: '=',
                test: '='
            },
            link: function (scope, iElement, iAttr) {
            }
        };
    }
})(ProgCheck || (ProgCheck = {}));
