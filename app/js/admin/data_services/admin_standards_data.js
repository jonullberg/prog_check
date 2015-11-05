/**
 * A factory for holding an admin's standards data
 * Created by Jonathan Ullberg on 10/23/2015
 */
'use strict';

module.exports = function(app) {
  app.factory('AdminStandardsData', ['$http', '$rootScope', 'Errors', function ($http, $rootScope, Errors) {

    var adminStandardsData = {
      standards: [],
      standard: null,
      goal: null,
      getStandards: function() {
        return this.standards;
      },
      setStandards: function(standards) {
        if (Array.isArray(standards)) {
          this.standards = standards;
        }
        return;
      },
      getStandard: function() {
        return this.standard;
      },
      setStandard: function(standard) {
        this.standard = standard;
        return;
      },
      getGoal: function() {
        return this.goal;
      },
      setGoal: function(goal) {
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
    return adminStandardsData;

    function fetchStandards(cb) {
      $http.get('/api/standards')
        .then(function(response) {
          var standards = response.data.standards;
          this.standards = standards;
          $rootScope.$broadcast('standards:changed', standards);
          if (cb && typeof cb === 'function') {
            cb(null, response.data);
          }
        }.bind(this))
        .catch(function(rejection) {
          if (cb && typeof cb === 'function') {
            cb(rejection);
            return Errors.addError({
              'msg': 'There was an error fetching the standards from the server. Please log out, refresh and try again. If it persists, please create a bug report so we can fix it.'
            });
          }
        });
    }

    function fetchStandard(standardId, cb) {
      $http.get('/api/standards/' + standardId)
        .then(function(response) {
          var data = response.data;
          if (data.standard) {
            this.standard = data.standard;
            $rootScope.$broadcast('standard:changed', data.standard);
            if (cb & typeof cb === 'function') {
              cb(null, data);
            }
          }
        }.bind(this))
        .catch(function(rejection) {
          if (cb && typeof cb === 'function') {
            cb(rejection);
          }
          return Errors.addError({
            'msg': 'There was an error getting the standard from the server. Please contact the administrator'
          });
        });
    }

    function createStandard(standard, cb) {
      $http.post('/api/standards', standard)
        .then(function(response) {
          var standard = response.data.standard;
          if (standard) {
            this.standard = standard;
            $rootScope.$broadcast('standard:changed', standard);
            if (cb && typeof cb === 'function') {
              cb(null, response.data);
            }
          }
        })
        .catch(function(rejection) {
          if (cb && typeof cb === 'function') {
            cb(rejection);
          }
          return Errors.addError({
            'msg': 'There was an error saving this standard to the server. Log-out, refresh, log-in and try again. If the problem persists, file a bug report and we\'ll get to fixing it'
          });
        });
    }

    function updateStandard(standard, cb) {
      $http.put('/api/standards/' + standard._id, standard)
        .then(function(response) {
          this.standards.splice(this.standards.indexOf(standard), standard);
          $rootScope.$broadcast('standards:changed', this.standards);
          if (cb && typeof cb === 'function') {
            cb(null, response.data);
          }
        }.bind(this))
        .catch(function(rejection) {
          if (cb && typeof cb === 'function') {
            cb(rejection);
          }
          return Errors.addError({
            'msg': 'There was an error updating this standard. Please log-out, refresh, log-in and try again. If the problem persists, please file a bug report and we will fix it soon.'
          });
        });
    }

    function deleteStandard(standardId, cb) {
      $http.delete('/api/standards/' + standardId)
        .then(function(response) {
          var data = response.data;
          this.standard = null;
          this.standards = this.standards.filter(function(standard) {
            if (standard._id != standardId) {
              return standard;
            }
          });
          $rootScope.$broadcast('standards:changed', this.standards);
          if (cb && typeof cb === 'function') {
            cb(null, data);
          }
        }.bind(this))
        .catch(function(rejection) {
          if (cb && typeof cb === 'function') {
            cb(rejection);
          }
          return Errors.addError({
            'msg': 'There was an error deleting this standard. Please log out, refresh, log in and try again. If the problem persists, please file a bug report and we will get it fixed.'
          });
        });
    }
    function createGoal(standardId, goal, cb) {
      $http.post('/api/standards/' + standardId + '/goals', goal)
        .then(function(response) {
          var data = response.data;
          this.standard = data.standard;
          $rootScope.$broadcast('standard:changed', this.standard);
          if (cb && typeof cb === 'function') {
            cb(null, data);
          }
        }.bind(this))
        .catch(function(rejection) {
          if (cb && typeof cb === 'function') {
            cb(rejection);
          }
          return Errors.addError({
            'msg': 'There was an error creating that goal. Please log out, refresh, log in and try again. If the problem persists, please file a bug report and we will get it fixed.'
          });
        });
    }
    function updateGoal(standardId, goal, cb) {
      $http.put('/api/standards/' + standardId + '/goals/' + goal._id, goal)
        .then(function(response) {
          this.standard.goals.splice(this.standard.goals.indexOf(goal), 1, goal);
          $rootScope.$broadcast('standard:changed', this.standard);
          if (cb && typeof cb === 'function') {
            cb(null, response.data);
          }
        }.bind(this))
        .catch(function(rejection) {
          if (cb && typeof cb === 'function') {
            cb (rejection);
          }
          return Errors.addError({
            'msg': 'There was an error deleting that goal. Please log out, refresh, log in and try again. If the problem persists, please file a bug report and we will get it fixed.'
          });
        });
    }
    function deleteGoal(standardId, goalId, cb) {
      $http.delete('/api/standards/' + standardId + '/goals/' + goalId)
        .then(function(response) {
          var data = response.data;
          this.standard = data.standard;
          $rootScope.$broadcast('standard:changed', this.standard);
          if (cb && typeof cb === 'function') {
            cb(null, data);
          }
        }.bind(this))
        .catch(function(rejection) {
          if (cb && typeof cb === 'function') {
            cb(rejection);
          }
          return Errors.addError({
            'msg': 'There was an error deleting that goal. Please log out, refresh, log in and try again. If the problem persists, please file a bug report and we will get it fixed.'
          })
        })
    }
  }]);
};
