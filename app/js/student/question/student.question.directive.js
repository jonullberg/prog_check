'use strict';
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
module.exports = function (app) {
    app.directive('pcQuestion', pcQuestion);
};
