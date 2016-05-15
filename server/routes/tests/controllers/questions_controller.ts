'use strict';

var Tests = require('../../../models/Test');

var logError = require('../../../lib/log_error');

module.exports = {
  createQuestion: createQuestion,
  updateTextQuestion: updateTextQuestion,
  deleteQuestionByTestId: deleteQuestionByTestId
};

function createQuestion(req,res) {
  var newQuestion = req.body;
  Tests.findById(req.params.testId, updateTest);
  function updateTest(err, test) {
    if (err) {
      logError(err);
    }
    newQuestion.dateCreated = Date.now();
    test.questions.push(newQuestion);
    test.save(sendTest);
    function sendTest(err, data) {
      sendData(err, 'test', data, res);
    }
  }
}

function updateTextQuestion(req, res) {
  var updatedQuestion = req.body;
  delete updatedQuestion._id;
  Tests.update({
    '_id': req.params.testId,
    'questions._id': req.params.questionId
  },
    { $set: { 'questions.$': updatedQuestion } }, sendUpdateMessage);
  function sendUpdateMessage(err, test) {
    sendData(err, 'msg', 'Success', res);
  }
}

function deleteQuestionByTestId(req, res) {
  Tests.findById(req.params.testId, deleteQuestion);
  function deleteQuestion(err, test) {
    if (err) {
      logError(err, 500, 'Internal Server Error');
    }
    test.questions = test.questions.filter(filterQuestion);
    test.save(sendTest);
    function filterQuestion(question) {
      if (question._id != req.params.questionId) {
        return question;
      }
    }
    function sendTest(err, data) {
      sendData(err, 'test', data, res);
    }
  }
}

function sendData(err, key, value, res) {
  if (err) {
    logError(err, 500, 'Internal Server Error');
  }
  var responseObject = {};
  responseObject[key] = value;
  res.json(responseObject);
}
