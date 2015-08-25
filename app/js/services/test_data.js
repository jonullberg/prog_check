'use strict';

module.exports = function(app) {
  app.factory('Tests', ['$rootScope', '$http', 'RESTResource', 'SanitizeFractions', function($rootScope, $http, resource, SanitizeFractions) {
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
      getTestByGoalId: function(goal, callback) {
        $http.get('/api/tests/goal/' + goal._id)
          .success(
            function(data) {
              callback(null, data);
            })
          .error(
            function(data) {
              console.log(data);
              callback(data);
            });
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
          this.test = data;
          this.tests.splice(this.tests.indexOf(data), 1, data);
          $rootScope.$broadcast('test:changed');
          $rootScope.$broadcast('tests:changed');
        }.bind(this));
      },
      saveTest: function(test, callback) {
        if (test) {
          this.test = test;
          $rootScope.$broadcast('test:changed');
        }
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
        if (!this.test.questions) {
          this.test.questions = [];
        }
        if (this.test.fractions === true) {
          question = SanitizeFractions.sanitize(question);
        }
        this.test.questions.push(question);
        $rootScope.$broadcast('test:changed');
        Tests.save(this.test, function(err) {
          if (err) {
            callback(err);
          }
        });
      },

      saveQuestion: function(question, callback) {
        this.test.questions.splice(this.test.questions.indexOf(question), 1, question);
        this.tests.push(this.test);
        $rootScope.$broadcast('test:changed');
        $rootScope.$broadcast('tests:changed');
        Tests.save(this.test, function(err) {
          if (err) {
            return callback(err);
          }
        });
      },
      deleteQuestion: function(question, callback) {
        this.test.questions.splice(this.test.questions.indexOf(question), 1);
        this.tests.push(this.test);
        $rootScope.$broadcast('test:changed');
        $rootScope.$broadcast('tests:changed');
        Tests.save(this.test, function(err) {
          if (err) {
            return callback(err);
          }
        });
      }
    };



    return testData;
  }]);
};
