var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .factory('StudentTestData', ['$http', '$rootScope', 'Errors', 'shuffle', studentTestData]);
    function studentTestData($http, $rootScope, Errors, shuffle) {
        return {
            tests: null,
            test: null,
            getTest: function () {
                return this.test;
            },
            setTest: function (test) {
                this.test = test;
                $rootScope.$broadcast('test:changed', this.test);
                return;
            },
            getTests: function () {
                return this.tests;
            },
            setTests: function (tests) {
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
                .then(function (response) {
                this.setTests(response.data.tests);
                handleCallback(cb, response, null);
            }.bind(this))
                .catch(function (rejection) {
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
            }
            else {
                numberOfQuestions = student.numberOfQuestions;
            }
            $http.get('/api/tests?goalId=' + goal.goalId + '&questions=' + numberOfQuestions)
                .then(function (response) {
                this.setTest(response.data.test);
                handleCallback(cb, response, null);
            }.bind(this))
                .catch(function (rejection) {
                handleCallback(cb, null, rejection);
                return Errors.addError({
                    'msg': 'There was an error getting that test. Please log out, refresh, log in and try again. If the problem persists, please file a bug report and we will get it fixed.'
                });
            });
        }
        function createTest(studentId, test, cb) {
            $http.post('/api/students/' + studentId + '/tests/', test)
                .then(function (response) {
                this.setTest(response.data.test);
                handleCallback(cb, response, null);
            }.bind(this))
                .catch(function (rejection) {
                handleCallback(cb, null, rejection);
                return Errors.addError({
                    'msg': 'There was an error saving that test. Please log out, refresh, log in and try again. If the problem persists, please file a bug report and we will get it fixed.'
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
    }
})(ProgCheck || (ProgCheck = {}));
