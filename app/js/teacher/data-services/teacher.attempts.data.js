var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .factory('TeacherAttemptsData', ['$rootScope', '$http', '$log', 'Errors', teacherAttemptsData]);
    function teacherAttemptsData($rootScope, $http, $log, Errors) {
        var attemptData = {
            attempt: null,
            attempts: null,
            results: null,
            getAttempts: function () {
                return this.attempts;
            },
            setAttempts: function (attempts) {
                this.attempts = attempts;
                $rootScope.$broadcast('attempts:changed', this.attempts);
                return;
            },
            getAttempt: function () {
                return this.attempt;
            },
            setAttempt: function (attempt) {
                this.attempt = attempt;
                $rootScope.$broadcast('attempt:changed', this.attempt);
                return;
            },
            getResults: function () {
                return this.results;
            },
            setResults: function (results) {
                this.results = results;
                $rootScope.$broadcast('results:changed', this.results);
                return;
            },
            fetchAttempts: fetchAttempts,
            fetchAttemptsByGoal: fetchAttemptsByGoal,
            fetchAttempt: fetchAttempt,
            archiveAttempt: archiveAttempt
        };
        function fetchAttempts(studentId, cb) {
            $http.get('/api/students/' + studentId + '/attempts/')
                .then(function (response) {
                this.setAttempts(response.data.attempts);
                handleCallback(cb, response, null);
            }.bind(this))
                .catch(function (rejection) {
                handleCallback(cb, null, rejection);
                return Errors.addError({
                    'msg': 'There was an error getting that students attempts. Please log-out, log back in and try again. If the problem persists, please send a bug report and we will fix it as soon as possible.'
                });
            });
        }
        function fetchAttemptsByGoal(studentId, goalId, cb) {
            $http.get('/api/students/' + studentId + '/attempts?goalId=' + goalId)
                .then(function (response) {
                console.log(response);
                this.setAttempts(response.data.attempts);
                this.setResults(response.data.results);
                handleCallback(cb, response, null);
            }.bind(this))
                .catch(function (rejection) {
                handleCallback(cb, null, rejection);
                return Errors.addError({
                    'msg': 'There was an error getting that students attempts. Please log-out, log back in and try again. If the problem persists, please send a bug report and we will fix it as soon as possible.'
                });
            });
        }
        function fetchAttempt() { }
        function archiveAttempt(studentId, attemptId, cb) {
            $http.delete('/api/students/' + studentId + '/attempts/' + attemptId)
                .then(function (response) {
                this.setAttempts(response.data.attempts);
                handleCallback(cb, response, null);
            }.bind(this))
                .catch(function (rejection) {
                handleCallback(cb, null, rejection);
                return Errors.addError({
                    'msg': 'There was an error archving that attempt. Please log-out, log back in and try again. If the problem persists, please send a bug report and we will fix it as soon as possible.'
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
        return attemptData;
    }
})(ProgCheck || (ProgCheck = {}));
