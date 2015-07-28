'use strict';

module.exports = function(app) {
  app.factory('dataStore',['$rootScope', 'RESTResource', function($rootScope, resource) {
    var Students = resource('students');
    var Standards = resource('standards');
    var Tests = resource('tests');
    var dataStore = {
      student: null,
      students: [],
      getStudent: function(id, callback) {
        Students.getOne(id, function(err, data) {
          if (err) {
            return callback(err);
          }
          callback(err, data);
        });
      },
      saveStudent: function() {
        Students.save(this.student, function(err) {
          if (err) {
            console.log(err);
          }
        });
      },
      getStudents: function(callback) {
        Students.getAll(function(err, data) {
          if (err) {
            return callback(err);
          }
          $rootScope.$broadcast('students:changed');
          callback(err, data);
        });
      },
      removeGoal: function(goal, callback) {
        this.student.goals.splice(this.student.goals.indexOf(goal), 1);
        this.saveStudent();
      },

      standard: null,
      setStandard: function(standard, callback) {
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
      standards: [],
      getStandards: function(callback) {
        Standards.getAll(function(err, data) {
          if (err) {
            return callback(err);
          }
          this.standards = data;
          $rootScope.$broadcast('standards:change');
          callback(err, data);
        }.bind(this));
      }
    };

    return dataStore;

  }]);
};
