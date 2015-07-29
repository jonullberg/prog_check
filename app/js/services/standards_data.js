'use strict';

module.exports = function(app) {
  app.factory('Standards', ['$rootScope', 'RESTResource', function($rootScope, resource) {
    var Standards = resource('standards');

    var standardData = {
      standard: null,
      standards: [],
      setStandard: function(standard) {
        this.standard = standard;
        $rootScope.$broadcast('standard:changed');
      },
      getStandard: function() {
        return this.standard;
      },
      removeStandard: function() {
        this.standard = null;
        $rootScope.$broadcast('standard:changed');
      },
      deleteStandard: function(standard, callback) {
        this.standards.splice(this.standards.indexOf(standard), 1);
        $rootScope.$broadcast('standards:changed');
        Standards.remove(standard, function(err, data) {
          if (err) {
            callback(err);
          }

        });
      },

      addStandard: function(standard, callback) {
        this.standard = standard;
        this.standards.push(standard);
        $rootScope.$broadcast('standard:changed');
        $rootScope.$broadcast('standards:changed');
        Standards.create(this.standard, function(err, data) {
          if (err) {
            callback(err);
          }
          callback(err, data);
        });
      },

      updateStandard: function(standard, callback) {
        this.standard = standard;
        this.standards.push(standard);
        Standards.save(standard, function(err) {
          if (err) {
            callback(err);
          }
          $rootScope.$broadcast('standards:changed');
          $rootScope.$broadcast('standard:changed');

        });
      },
      getStandards: function(callback) {
        Standards.getAll(function(err, data) {
          if (err) {
            return callback(err);
          }
          this.standards = data;
          $rootScope.$broadcast('standards:change');
          callback(err, data);
        }.bind(this));
      },

      addGoal: function(goal, callback) {
        this.standard.goals.push(goal);
        $rootScope.$broadcast('standard:changed');
        this.standards.push(this.standard);
        $rootScope.$broadcast('standards:changed');
        Standards.save(this.standard, function(err) {
          if (err) {
            return callback(err);
          }
        });
      },

      saveGoal: function(goal, callback) {
        this.standard.goals.splice(this.standard.goals.indexOf(goal), 1, goal);
        $rootScope.$broadcast('standard:changed');
        this.standards.push(this.standard);
        $rootScope.$broadcast('standard:changed');
        Standards.save(this.standard, function(err) {
          if (err) {
            return callback(err);
          }
        });
      }
    };
    return standardData;
  }]);
};
