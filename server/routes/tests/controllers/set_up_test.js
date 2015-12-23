'use strict';

var shuffle = require('../../../lib/shuffle');

function setUpTest(test, number) {
  var questions = shuffle(test.questions).slice(0,number);
  questions.forEach(function(question) {
    question.answers = shuffle(question.answers);
  });
  var attempt = {
    correctAnswers:0,
    active:true,
    directions: test.testDirections,
    testId: test._id,
    maxQuestions: number,
    questions: questions
  }
  return attempt;
}

module.exports = setUpTest;
