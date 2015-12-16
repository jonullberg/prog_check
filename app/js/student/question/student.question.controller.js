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
