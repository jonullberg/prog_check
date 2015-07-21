'use strict';

module.exports = function(app) {
  app.factory('dataStore',['$rootScope', 'RESTResource', function($rootScope, resource) {
    var Student = resource('students');
    var Standard = resource('standards');
    var Test = resource('tests');
    var dataStore = {
      student: null,
      students: [],
      getStudent: function(id, callback) {
        Student.getOne(id, function(err, data) {
          if (err) {
            return callback(err);
          }
          callback(err, data);
        });
      },
      saveStudent: function() {

        Student.save(this.student, function(err, data) {
          if (err) {
            console.log(err);
          }
          console.log(data);
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
          this.standards = data;
          callback(err, data);
        });
      },

      test: null,
      tests: [],
      getTests: function(callback) {
        Test.getAll(function(err, data) {
          if (err) {
            return callback(err);
          }
          this.tests = data;
          callback(err, data);
        });
      },
      createTest: function(test, callback) {

        Test.create(test, function(err, data) {
          if (err) {
            return callback(err);
          }

        });
      },
      saveTest: function(test, callback) {
        Test.save(this.test, function(err, data) {
          if (err) {
            callback(err);
          }
          callback(err, data);
        });
      },
      addQuestion: function(question, callback) {
        this.test.questions.push(question);
        $rootScope.$broadcast('test:changed', {
          test: this.test
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
