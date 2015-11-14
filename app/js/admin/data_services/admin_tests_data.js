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
          handleCallback(cb, response);
        }.bind(this))
        .catch(function(rejection) {
          handleCallback(cb, null, rejection);
          return Errors.addError({
            'msg': 'There was an error fetching the tests from the server. Please log out, refresh and try again. If it persists, please create a bug report so we can fix it.'
          })
        });
    }

    function fetchTest(testId, cb) {
      $http.get('/api/tests/' + testId)
        .then(function(response) {
          this.setTest(response.data.test);
          handleCallback(cb, response);
        }.bind(this))
        .catch(function(rejection) {
          handleCallback(cb, null, rejection);
          return Errors.addError({
            'msg': 'There was an error fetching that test from the server. Please log out, refresh and try again. If it persists, please create a bug report so we can fix it.'
          });
        });
    }

    function createTest(test, cb) {
      $http.post('/api/tests/', test)
      .then(function(response) {
        this.setTest(response.data.test);
        handleCallback(cb, response);
      }.bind(this))
      .catch(function(rejection) {
        handleCallback(cb, null, rejection);
        return Errors.addError({
          'msg': 'There was an error creating that test on the server. Please log out, refresh and try again. If it persists, please create a bug report so we can fix it.'
        });
      });
    }

    function updateTest(test, cb) {
      $http.put('/api/tests/' + test._id, test)
        .then(function(response) {
          this.setTest(test);
          handleCallback(cb, response);
        }.bind(this))
        .catch(function(rejection) {
          handleCallback(cb, null, rejection);
          return Errors.addError({
            'msg': 'There was an error creating that test on the server. Please log out, refresh and try again. If it persists, please create a bug report so we can fix it.'
          });
        });
    }

    function deleteTest() {}

    function fetchQuestion() {}

    function createQuestion(testId, question, cb) {
      $http.post('/api/tests/' + testId + '/questions/', question)
        .then(function(response) {
          this.setTest(response.data.test);
          handleCallback(cb, response);
        }.bind(this))
        .catch(function(rejection) {
          handleCallback(cb, null, rejection);
          return Errors.addError({
            'msg': 'There was an error creating that question on the server. Please log out, refresh and try again. If it persists, please create a bug report so we can fix it.'
          });
        });
    }

    function updateQuestion(testId, question, cb) {
      $http.put('/api/tests/' + testId + '/questions/' + question._id, question)
        .then(function(response) {
          this.setTest(response.data.test);
          handleCallback(cb, response);
        }.bind(this))
        .catch(function(rejection) {
          handleCallback(cb, null, rejection);
          return Errors.addError({
            'msg': 'There was an error updating that question on the server. Please log out, refresh and try again. If it persists, please create a bug report so we can fix it.'
          });
        });

    }

    function deleteQuestion(testId, questionId, cb) {
      $http.delete('/api/tests/' + testId + '/questions/' + questionId)
        .then(function(response) {
          this.setTest(response.data.test);
          handleCallback(cb, response);
        }.bind(this))
        .catch(function(rejection) {
          handleCallback(cb, null, rejection);
          return Errors.addError({
            'msg': 'There was an error deleting that question from the server. Please log out, refresh and try again. If it persists, please create a bug report so we can fix it.'
          });
        });
    }
    function handleCallback(cb, response, rejection) {
      if (cb && typeof cb === 'function') {
        if (response) {
          return cb(null, response.data);
        }
        cb(rejection);
      }
    }
    return adminTestsData;
  }]);
};
