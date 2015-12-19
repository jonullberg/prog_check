var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .directive('pcQuestion', pcQuestion);
    function pcQuestion() {
        return {
            restrict: 'E',
            templateUrl: '/templates/student/question.html',
            replace: true,
            controller: 'QuestionCtrl',
            scope: {
                question: '=',
                selectAnswer: '&'
            },
            link: function (scope, iEl, iAttr) {
            }
        };
    }
})(ProgCheck || (ProgCheck = {}));
