/**
 * The controller for a students question
 * For use in the Prog Check testing application
 * Created by Jonathan Ullberg on 10/03/2015
 * /app/js/student/question/student.question.controller.ts
 */
var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('QuestionCtrl', ['$sce', questionCtrl]);
    function questionCtrl($sce) {
        var qu = this;
        qu.trustAsHtml = $sce.trustAsHtml;
        qu.select = function (answer, $index) {
            qu.question.selectedIndex = $index;
            qu.selectAnswer({
                answer: answer
            });
        };
    }
})(ProgCheck || (ProgCheck = {}));
