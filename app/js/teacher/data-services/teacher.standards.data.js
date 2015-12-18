/**
 * A factory for holding an admin's standards data
 * Created by Jonathan Ullberg on 10/23/2015
 */
var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .factory('TeacherStandardsData', ['$http', '$rootScope', 'Errors', teacherStandardsData]);
    function teacherStandardsData($http, $rootScope, Errors) {
        var teacherStandardsData = {
            standards: null,
            standard: null,
            goal: null,
            getStandards: function () {
                return this.standards;
            },
            setStandards: function (standards) {
                this.standards = standards;
                $rootScope.$broadcast('standards:changed');
                return;
            },
            getStandard: function () {
                return this.standard;
            },
            setStandard: function (standard) {
                this.standard = standard;
                $rootScope.$broadcast('standard:changed', standard);
                return;
            },
            getGoal: function () {
                return this.goal;
            },
            setGoal: function (goal) {
                this.goal = goal;
                return;
            },
            fetchStandards: fetchStandards,
            fetchStandard: fetchStandard,
            createStandard: createStandard,
            updateStandard: updateStandard,
            deleteStandard: deleteStandard,
            createGoal: createGoal,
            updateGoal: updateGoal,
            deleteGoal: deleteGoal
        };
        return teacherStandardsData;
        function fetchStandards(cb) {
            $http.get('/api/standards')
                .then(function (response) {
                this.setStandards(response.data.standards);
                handleCallback(cb, response, null);
            }.bind(this))
                .catch(function (rejection) {
                handleCallback(cb, null, rejection);
                return Errors.addError({
                    'msg': 'There was an error fetching the standards from the server. Please log out, refresh and try again. If it persists, please create a bug report so we can fix it.'
                });
            });
        }
        function fetchStandard(standardId, cb) {
            $http.get('/api/standards/' + standardId)
                .then(function (response) {
                this.setStandard(response.data.standard);
                handleCallback(cb, response, null);
            }.bind(this))
                .catch(function (rejection) {
                handleCallback(cb, null, rejection);
                return Errors.addError({
                    'msg': 'There was an error getting the standard from the server. Please contact the administrator'
                });
            });
        }
        function createStandard(standard, cb) {
            $http.post('/api/standards', standard)
                .then(function (response) {
                var standard = response.data.standard;
                if (standard) {
                    this.setStandard(standard);
                    handleCallback(cb, response, null);
                }
            })
                .catch(function (rejection) {
                handleCallback(cb, null, rejection);
                return Errors.addError({
                    'msg': 'There was an error saving this standard to the server. Log-out, refresh, log-in and try again. If the problem persists, file a bug report and we\'ll get to fixing it'
                });
            });
        }
        function updateStandard(standard, cb) {
            $http.put('/api/standards/' + standard._id, standard)
                .then(function (response) {
                this.standards.splice(this.standards.indexOf(standard), standard);
                $rootScope.$broadcast('standards:changed', this.standards);
                handleCallback(cb, response, null);
            }.bind(this))
                .catch(function (rejection) {
                handleCallback(cb, null, rejection);
                return Errors.addError({
                    'msg': 'There was an error updating this standard. Please log-out, refresh, log-in and try again. If the problem persists, please file a bug report and we will fix it soon.'
                });
            });
        }
        function deleteStandard(standardId, cb) {
            $http.delete('/api/standards/' + standardId)
                .then(function (response) {
                var data = response.data;
                this.setStandard(null);
                this.setStandards(this.standards.filter(function (standard) {
                    if (standard._id != standardId) {
                        return standard;
                    }
                }));
                handleCallback(cb, response, null);
            }.bind(this))
                .catch(function (rejection) {
                handleCallback(cb, null, rejection);
                return Errors.addError({
                    'msg': 'There was an error deleting this standard. Please log out, refresh, log in and try again. If the problem persists, please file a bug report and we will get it fixed.'
                });
            });
        }
        function createGoal(standardId, goal, cb) {
            $http.post('/api/standards/' + standardId + '/goals', goal)
                .then(function (response) {
                var data = response.data;
                this.standard = data.standard;
                $rootScope.$broadcast('standard:changed', this.standard);
                handleCallback(cb, response, null);
            }.bind(this))
                .catch(function (rejection) {
                handleCallback(cb, null, rejection);
                return Errors.addError({
                    'msg': 'There was an error creating that goal. Please log out, refresh, log in and try again. If the problem persists, please file a bug report and we will get it fixed.'
                });
            });
        }
        function updateGoal(standardId, goal, cb) {
            $http.put('/api/standards/' + standardId + '/goals/' + goal._id, goal)
                .then(function (response) {
                this.standard.goals.splice(this.standard.goals.indexOf(goal), 1, goal);
                $rootScope.$broadcast('standard:changed', this.standard);
                handleCallback(cb, response, null);
            }.bind(this))
                .catch(function (rejection) {
                handleCallback(cb, null, rejection);
                return Errors.addError({
                    'msg': 'There was an error deleting that goal. Please log out, refresh, log in and try again. If the problem persists, please file a bug report and we will get it fixed.'
                });
            });
        }
        function deleteGoal(standardId, goalId, cb) {
            $http.delete('/api/standards/' + standardId + '/goals/' + goalId)
                .then(function (response) {
                var data = response.data;
                this.standard = data.standard;
                $rootScope.$broadcast('standard:changed', this.standard);
                handleCallback(cb, response, null);
            }.bind(this))
                .catch(function (rejection) {
                handleCallback(cb, null, rejection);
                return Errors.addError({
                    'msg': 'There was an error deleting that goal. Please log out, refresh, log in and try again. If the problem persists, please file a bug report and we will get it fixed.'
                });
            });
        }
        function fetchExampleQuestion(goal, cb) {
            $http.get('/api/tests?standardId=' + goal._id + '/questions/random');
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
