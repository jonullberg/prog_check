'use strict';

module.exports = function(app) {
  app.factory('Tests', ['$rootScope', 'RESTResource', function($rootScope, resource) {
    var Tests = resource('tests');

    var testData = {
      tests: [],
      test: null,
      getTests: function(callback) {
        Tests.getAll(function(err, data) {
          if (err) {
            return callback(err);
          }
          this.tests = data;
          $rootScope.$broadcast('tests:changed');
          callback(err, data);
        }.bind(this));
      },
      setTest: function(test, callback) {
        this.test = test;
        $rootScope.$broadcast('test:changed');
      },
      createTest: function(test, callback) {
        this.test = test;
        this.tests.push(test);
        $rootScope.$broadcast('test:changed');
        $rootScope.$broadcast('tests:changed');
        Tests.create(test, function(err, data) {
          if (err) {
            return callback(err);
          }
        });
      },
      saveTest: function(test, callback) {
        this.test = test;
        Tests.save(this.test, function(err, data) {
          if (err) {
            callback(err);
          }
          callback(err, data);
        });
      },
      deleteTest: function(test, callback) {
        this.tests.splice(this.tests.indexOf(test), 1);
        $rootScope.$broadcast('tests:changed');
        Tests.remove(test, function(err) {
          if (err) {
            callback(err);
          }
        });
      },
      removeTest: function() {
        this.test = null;
        $rootScope.$broadcast('test:changed');
      },
      addQuestion: function(question, callback) {
        this.test.questions.push(question);
        $rootScope.$broadcast('test:changed');
        Tests.save(this.test, function(err) {
          if (err) {
            callback(err);
          }
        });
      }
    };



    return testData;
  }]);
};
