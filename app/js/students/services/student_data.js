'use strict';

module.exports = function(app) {
  app.factory('Student', ['$rootScope', '$http', '$cookies', 'RESTResource', function($rootScope, $http, $cookies, resource) {
    var Student = resource('student');
    var studentData = {
      student: $cookies.getObject('user'),
      test: null,
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

      getStudent: function() {

      }
    };
    return studentData;
  }]);
};
