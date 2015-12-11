/**
 * For use in the Prog Check testing application
 * A module to store a students test data
 * Created by Jonathan Ullberg on 10/23/2015
 */
'use strict';

module.exports = function(app) {
  app.factory('StudentTestData', ['$http', '$rootScope', 'Errors', 'shuffle', function ($http, $rootScope, Errors, shuffle) {
    var studentTestData = {
      tests: null,
      test: null,
      getTest: function() {
        return this.test;
      },
      setTest: function(test) {
        this.test = test;
        $rootScope.$broadcast('test:changed', this.test);
        return;
      },
      getTests: function() {
        return this.tests;
      },
      setTests: function(tests) {
        this.tests = tests;
        $rootScope.$broadcast('tests:changed', this.tests);
        return;
      },
      fetchTests: fetchTests,
      fetchTest: fetchTest,
      createTest: createTest
    };

    function fetchTests(studentId, cb) {
      $http.get('/api/students/' + studentId + '/tests/')
        .then(function(response) {
          this.setTests(response.data.tests);
          handleCallback(cb, response);
        }.bind(this))
        .catch(function(rejection) {
          handleCallback(cb, null, rejection);
          return Errors.addError({
            'msg': 'There was an error getting your tests. Please log out, refresh, log in and try again. If the problem persists, please file a bug report and we will get it fixed.'
          });
        });
    }
    function fetchTest(goalId, student, cb) {
      $http.get('/api/tests?goalId=' + goalId)
        .then(function(response) {
          var selectedGoal = student.goals.filter(function(goal) {
            if (goal.goalId) {
              return goal.goalId === goalId;
            } else {
              return goal._id === goalId;
            }
          })[0];
          var numberOfQuestions = selectedGoal.numberOfQuestions;
          var test;
          if (response.data.test) {
            test = setUpTest(response.data.test, student, numberOfQuestions);
          } else {
            test = null;
          }
          this.setTest(test);
          handleCallback(cb, response);
        }.bind(this))
        .catch(function(rejection) {
          handleCallback(cb, null, rejection);
          return Errors.addError({
            'msg': 'There was an error getting that test. Please log out, refresh, log in and try again. If the problem persists, please file a bug report and we will get it fixed.'
          });
        });
    }

    /**
     *
     */
    function createTest(studentId, test, cb) {
      $http.post('/api/students/' + studentId + '/tests/', test)
        .then(function(response) {
          this.setTest(response.data.test);
          handleCallback(cb, response);
        }.bind(this))
        .catch(function(rejection) {
          handleCallback(cb, null, rejection);
          return Errors.addError({
            'msg': 'There was an error saving that test. Please log out, refresh, log in and try again. If the problem persists, please file a bug report and we will get it fixed.'
          });
        });
    }
    /**
     * Takes a test, shuffles its questions and turnes it into a students attempt
     * @param  {Object} test The Test object from the server
     * @return {Object}      A process Test
     */
    function setUpTest(test, student, numberOfQuestions) {
      console.log('test', test);
      console.log('student', student);
      var max = getMaxQuestions(student, numberOfQuestions);
      var newTest = {};
      newTest.maxQuestions = max;
      newTest.studentId = student._id;
      newTest.testId = test._id;
      newTest.correctAnswers = 0;
      newTest.questions = createQuestions(test.questions, max);
      newTest.directions = test.testDirections;
      newTest.active = true;
      return newTest;
    }
    function getMaxQuestions(student, numberOfQuestions) {
      var max;
      if (numberOfQuestions) {
        max = numberOfQuestions;
      } else {
        max = student.numberOfQuestions;
      }
      return max;
    }
    function createQuestions(questions, num) {
        questions = shuffle.shuffle(questions);
        questions = questions.slice(0, num);
        questions.forEach(function(question) {
          question.answers = shuffle.shuffle(question.answers);
          question.type = 'info';
          return question;
        });
        return questions;
    }
    /**
     * Deals with handling callbacks, can be reused if a rejection or successful response
     * @param  {Function} cb        A callback function to execute on data
     * @param  {Object}   response  The response object if a successful request
     * @param  {Object}   rejection The rejection object/error object if a failed request
     * @return {undefined}
     */
    function handleCallback(cb, response, rejection) {
      if (cb && typeof cb === 'function') {
        if (response) {
          return cb(null, response.data);
        }
        cb(rejection);
      }
    }
    return studentTestData;
  }]);
}
