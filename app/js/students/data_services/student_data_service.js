'use strict';
//  TODO: Refactor this data into other external modules
module.exports = function(app) {
  app.factory('StudentData', ['$rootScope', '$http', '$cookies', 'RESTResource', 'Errors', 'StudentUserData', 'StudentTestData', function($rootScope, $http, $cookies, resource, Errors, Student, Tests) {
    var Student = Student;
    var Tests = Tests;
    var studentData = {
      student: $cookies.getObject('user'),
      getTestByGoalId: function(goalId, callback) {
        $http.get('/api/tests/goal/' + goalId)
          .then(
            function(response) {
              var data = response.data[0];
              return callback(null, data);
            })
          .catch(
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
        $http.post('/api/tests/attempts', attempt)
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
