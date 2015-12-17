var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .directive('pcQuestion', pcQuestion);
    function pcQuestion() {
        return {
            restrict: 'E',
            templateUrl: '/templates/directives/student/question.html',
            replace: true,
            controller: 'QuestionCtrl',
            controllerAs: 'qu',
            scope: {
                question: '=',
                selectAnswer: '&'
            }
        };
    }
})(ProgCheck || (ProgCheck = {}));
