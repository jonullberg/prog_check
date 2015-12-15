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
            templateUrl: './question-form.html',
            scope: {
                question: '=',
                save: '&',
                addQuestion: '&',
                buttonText: '=',
                cancel: '&'
            },
            link: function (scope, iElement, iAttr) {
            }
        };
    }
})(ProgCheck || (ProgCheck = {}));
