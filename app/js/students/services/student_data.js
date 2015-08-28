'use strict';

module.exports = function(app) {
  app.factory('Student', ['$rootScope', '$http', '$cookies', 'RESTResource', function($rootScope, $http, $cookies, resource) {
    var Student = resource('student');
    var Tests = resource('tests');
    var studentData = {
      student: $cookies.getObject('user'),
      test: null,
      attempt: {
        testId: null,
        studentId: null,
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
            callback(err);
          }

          callback(err, data);
        });
      },
      getStudent: function() {

      }
    };
    return studentData;
  }]);
};
