/**
 * For use in the Prog Check testing application
 * A module to store a students test data
 * Created by Jonathan Ullberg on 10/23/2015
 */
'use strict';

module.exports = function(app) {
  app.factory('StudentTestData', ['$http', '$rootScope', 'Errors', function ($http, $rootScope, Errors) {
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
      fetchTest: fetchTest
    };

    function fetchTests(studentId, cb) {
      $http.get('/api/students/' + studentId + '/tests/')
        .then(function(response) {
          var data = response.data;
          this.tests = data.tests;
          $rootScope.$broadcast('tests:changed', this.tests);
          handleCallback(cb, response);
        })
        .catch(function(rejection) {
          handleCallback(cb, null, rejection);
          return Errors.addError({
            'msg': 'There was an error getting your tests. Please log out, refresh, log in and try again. If the problem persists, please file a bug report and we will get it fixed.'
          });
        });
    }
    function fetchTest(studentId, testId, cb) {
      $http.get('/api/students/' + studentId + '/tests/' + testId)
        .then(function(response) {
          var data = response.data;
          this.test = data.test;
          $rootScope.$broadcast('test:changed', this.test);
          handleCallback(cb, response);
        })
        .catch(function(rejection) {
          handleCallback(cb, null, rejection);
          return Errors.addError({
            'msg': 'There was an error getting that test. Please log out, refresh, log in and try again. If the problem persists, please file a bug report and we will get it fixed.'
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

    return studentTestData;
  }])
}
