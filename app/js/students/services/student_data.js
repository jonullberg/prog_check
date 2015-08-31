'use strict';

module.exports = function(app) {
  app.factory('Student', ['$rootScope', '$http', '$cookies', 'RESTResource', 'Errors', function($rootScope, $http, $cookies, resource, Errors) {
    var Student = resource('student');
    var Tests = resource('tests');
    var Attempt = resource('attempt');
    var studentData = {
      student: $cookies.getObject('user'),
      test: null,
      attempt: {
        testId: null,
        studentId: null,
        correctAnswers:0,
        questions: []
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
      getTest: function(testId, callback) {
        Tests.getOne(testId, function(err, data) {
          if (err) {
            return Errors.addError({
              'msg': 'There was an error getting your test'
            });
          }

          callback(err, data);
        });
      },
      getStudent: function() {

      },
      saveAttempt: function(attempt, callback) {
        this.attempt = attempt;
        $http.post('/api/tests/attempt', attempt)
          .success(function(res) {
            callback(res.data);
          })
          .error(function(err) {
            callback(err);
          });
      }
    };
    return studentData;
  }]);
};
