'use strict';

module.exports = function(app) {
  app.factory('dataStore',['$rootScope', 'RESTResource', function($rootScope, resource) {
    var Student = resource('students');
    var dataStore = {
      students: [];
      getStudents: function(callback) {
        Student.getAll(function(err, data) {
          if (err) return callback(err);
          return data;
        });
      }
    }
    var standards = [];
    var students = [];
    var
    var saveStudent = function(student) {
      students.push(student);
      $rootScope.$broadcast('students:updated', )
    }
    var save
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
