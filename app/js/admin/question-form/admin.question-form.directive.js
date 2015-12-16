/**
 * A Directive for the Question Form
 * For use in the Prog Check testing application
 * Created by Jonathan Ullberg on 10/20/2015
 */
/// <reference path="../../../../tools/typings/tsd.d.ts" />
var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .directive('pcQuestionForm', pcQuestionForm);
    // export = function(app) {
    //   app
    // };
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
