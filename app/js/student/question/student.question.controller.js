'use strict';
function questionCtrl($sce) {
    var qu = this;
    qu.trustAsHtml = $sce.trustAsHtml;
    qu.select = function (answer, $index) {
        qu.question.selectedIndex = $index;
        qu.selectAnswer({ answer: answer });
    };
}
module.exports = function (app) {
    app.controller('QuestionCtrl', ['$sce', questionCtrl]);
};
