/**
 * For use in the Prog Check testing application
 * A module to store a students test data
 * Created by Jonathan Ullberg on 10/23/2015
 */

module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .factory('StudentTestData', ['$http', '$rootScope', 'Errors', 'shuffle', studentTestData])

  function studentTestData($http, $rootScope, Errors, shuffle) {
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
          handleCallback(cb, response, null);
        }.bind(this))
        .catch(function(rejection) {
          handleCallback(cb, null, rejection);
          return Errors.addError({
            'msg': 'There was an error getting your tests. Please log out, refresh, log in and try again. If the problem persists, please file a bug report and we will get it fixed.'
          });
        });
    }
    function fetchTest(goal, student, cb) {
      var numberOfQuestions;
      if (goal.numberOfQuestions) {
        numberOfQuestions = goal.numberOfQuestions;
      } else {
        numberOfQuestions = student.numberOfQuestions;
      }
      $http.get('/api/tests?goalId=' + goal.goalId + '&questions=' + numberOfQuestions)
        .then(function(response) {
          this.setTest(response.data.test);
          handleCallback(cb, response, null);
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
          handleCallback(cb, response, null);
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
    function setUpTest(test, student, goalId) {
      var max = getMaxQuestions(student, goalId);
      var newTest = {
        maxQuestions: getMaxQuestions(student, goalId),
        studentId: student._id,
        testId: test._id,
        correctAnswers: 0,
        questions: createQuestions(test.questions, max),
        directions: test.testDirections,
        active: true
      };
      return newTest;
    }
    function getMaxQuestions(student, goalId) {
      var max;
      var selectedGoal = student.goals.filter(function(goal) {
        if (goal._id === goalId) {
          return goal;
        }
      })[0];
      if (selectedGoal.numberOfQuestions) {
        max = selectedGoal.numberOfQuestions;
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
  }
}
