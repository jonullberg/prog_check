'use strict';

module.exports = function(app) {
  app.factory('dataStore',['$rootScope', 'RESTResource', function($rootScope, resource) {
    var Student = resource('students');
    var Standard = resource('standards');
    var dataStore = {
      student: null,
      students: [],
      getStudent: function(id, callback) {
        Student.getOne(id, function(err, data) {
          if (err) {
            return callback(err);
          }
          // $rootScope.$broadcast('student:changed');
          callback(err, data);
        });
      },
      getStudents: function(callback) {
        Student.getAll(function(err, data) {
          if (err) {
            return callback(err);
          }
          $rootScope.$broadcast('students:changed');
          callback(err, data);
        });
      },

      standard: null,
      standards: [],
      getStandards: function(callback) {
        Standard.getAll(function(err, data) {
          if (err) {
            return callback(err);
          }
          callback(err, data);
        });
      }
    };
    var standards = [];
    var saveStudent = function(student) {
      students.push(student);
      $rootScope.$broadcast('students:updated');
    };
    return dataStore;

    var moveThis = {

      standards: standards,

      tests: [],

      questions: [],

      errors: [],


      standard: null,

      test: null,

      masterTest: null,

      isTestShowing: false,

      isTestFormShowing: false

    };
  }]);
};
