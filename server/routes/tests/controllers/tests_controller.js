'use strict';
var Tests = require('../../../models/Test');
var setUpTest = require('./set_up_test');
var logError = require('../../../lib/log_error');
module.exports = {
    createTest: createTest,
    getTests: getTests,
    findTestById: findTestById,
    updateTestById: updateTestById,
    deleteTestById: deleteTestById
};
function createTest(req, res) {
    var newTest = new Tests(req.body);
    newTest.save(saveTest);
    function saveTest(err, test) {
        sendData(err, 'test', test, res);
    }
}
function getTests(req, res) {
    if (req.query.standardId) {
        return Tests.find({ standardId: req.query.standardId }, sendTestsByStandardId);
    }
    else if (req.query.goalId) {
        return Tests.findOne({ goalId: req.query.goalId }).lean().exec(sendTestByGoalId);
    }
    else {
        return Tests.find({}, sendAllTests);
    }
    function sendTestsByStandardId(err, tests) {
        sendData(err, 'tests', tests, res);
    }
    function sendTestByGoalId(err, test) {
        var attempt = test
            ? setUpTest(test, req.query.questions)
            : null;
        sendData(err, 'test', attempt, res);
    }
    function sendAllTests(err, tests) {
        sendData(err, 'tests', tests, res);
    }
}
function findTestById(req, res) {
    Tests.findById(req.params.testId, sendTestById);
    function sendTestById(err, test) {
        sendData(err, 'test', test, res);
    }
}
function updateTestById(req, res) {
    var updatedTest = req.body;
    delete updatedTest._id;
    Tests.update({ _id: req.params.testId }, updatedTest, sendTest);
    function sendTest(err) {
        sendData(err, 'test', updatedTest, res);
    }
}
function deleteTestById(req, res) {
    Tests.remove({ '_id': req.params.testId }, sendDeleteMessage);
    function sendDeleteMessage(err, data) {
        sendData(err, 'msg', 'Success', res);
    }
}
function sendData(err, key, data, res) {
    if (err) {
        logError(err, 500, 'Internal Server Error');
    }
    var response = {};
    response[key] = data;
    res.json(response);
}
