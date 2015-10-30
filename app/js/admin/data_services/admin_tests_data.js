/**
 * A module for holding all tests for the admin
 * Created by Jonathan Ullberg on 10/23/2015
 */
'use strict';

module.exports = function(app) {
  app.factory('AdminTestsData', ['$http', '$rootScope', 'Errors', function ($http, $rootScope, Errors) {

    var adminTestsData = {
      tests: null,
      test: null,
      question: null,
      getTests: function() {
        return this.tests;
      },
      setTests: function(tests) {
        this.tests = tests;
        $rootScope.$broadcast('tests:changed', this.tests);
        return;
      },
      getTest: function() {
        return this.test;
      },
      setTest: function(test) {
        this.test = test;
        $rootScope.$broadcast('test:changed', this.test);
        return;
      },
      getQuestion: function() {
        return this.question;
      },
      setQuestion: function(question) {
        this.question = question;
        $rootScope.$broadcast('question:changed', this.question);
        return;
      },
      fetchTests: fetchTests,
      fetchTest: fetchTest,
      createTest: createTest,
      updateTest: updateTest,
      deleteTest: deleteTest,
      fetchQuestion: fetchQuestion,
      createQuestion: createQuestion,
      updateQuestion: updateQuestion,
      deleteQuestion: deleteQuestion
    };

    function fetchTests(standardId, cb) {
      $http.get('/api/tests?standardId=' + standardId)
        .then(function(response) {
          this.tests = response.data.tests;
          $rootScope.$broadcast('tests:changed', this.tests);
          if (cb && typeof cb === 'function') {
            cb(null, response.data);
          }
        }.bind(this))
        .catch(function(rejection) {
          if (cb && typeof cb === 'function') {
            cb(rejection);
          }
          return Errors.addError({
            'msg': 'There was an error fetching the tests from the server. Please log out, refresh and try again. If it persists, please create a bug report so we can fix it.'
          })
        });
    }

    function fetchTest(testId, cb) {
      $http.get('/api/tests/' + testId)
        .then(function(response) {
          this.test = response.data.test;
          $rootScope.$broadcast('test:changed', this.test);
          if (cb && typeof cb === 'function') {
            cb(null, response.data);
          }
        }.bind(this))
        .catch(function(rejection) {
          if (cb && typeof cb === 'function') {
            cb(rejection);
          }
          return Errors.addError({
            'msg': 'There was an error fetching that test from the server. Please log out, refresh and try again. If it persists, please create a bug report so we can fix it.'
          });
        });
    }

    function createTest() {}

    function updateTest() {}

    function deleteTest() {}

    function fetchQuestion() {}
    function createQuestion() {}
    function updateQuestion() {}
    function deleteQuestion(testId, questionId, cb) {
      $http.delete('/api/tests/' + testId + '/questions/' + questionId)
        .then(function(response) {
          this.test = response.data.test;
          $rootScope.$broadcast('test:changed', this.test);
          if (cb && typeof cb === 'function') {
            cb (null, response.data);
          }
        }.bind(this))
        .catch(function(rejection) {
          if (cb && typeof cb === 'function') {
            cb(rejection);
          }
          return Errors.addError({
            'msg': 'There was an error deleting that test from the server. Please log out, refresh and try again. If it persists, please create a bug report so we can fix it.'
          });
        });
    }

    return adminTestsData;
  }]);
};
