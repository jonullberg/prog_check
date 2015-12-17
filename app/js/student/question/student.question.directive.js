/**
 * The directive for a students question
 * For use in the Prog Check testing application
 * Created by Jonathan Ullberg on 10/03/2015
 * /app/js/student/question/student.question.directive.ts
 */
var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .directive('pcQuestion', pcQuestion);
    // export = function(app: any) {
    //   app.directive('pcQuestion', pcQuestion);
    // };
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
