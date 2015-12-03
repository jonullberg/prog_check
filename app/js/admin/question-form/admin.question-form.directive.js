'use strict';
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
        }
    };
}
module.exports = function (app) {
    app.directive('pcQuestionForm', pcQuestionForm);
};
