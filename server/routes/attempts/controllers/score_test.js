'use strict';
module.exports = function (attempt) {
    attempt.correctAnswers = 0;
    attempt.questions.forEach(function (question) {
        if (question.submitted !== question.correct) {
            return question.result = 'incorrect';
        }
        question.result = 'correct';
        attempt.correctAnswers++;
    });
    return attempt;
};
