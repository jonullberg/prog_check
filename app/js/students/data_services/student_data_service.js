'use strict';
module.exports = function(app) {
  app.factory('StudentData', ['$rootScope', '$http', 'Errors', 'StudentTestData', function($rootScope, $http, Errors, Tests) {
    var studentData = {
      Tests: Tests,
      student: null,
      getStudent: function() {
        return this.student;
      },
      setStudent: function(student) {
        this.student = student;
        $rootScope.$broadcast('student:changed');
      },
      fetchStudent: fetchStudent
    };
    function fetchStudent(studentId, cb) {
      $http.get('/api/students/' + studentId)
        .then(function(response) {
          this.setStudent(response.data.student);
          handleCallback(cb, response);
        }.bind(this))
        .catch(function(rejection) {
          handleCallback(cb, null, rejection);
          return Errors.addError({
            'msg': 'There was an error fetching your information from the server. Please log out, refresh and try again. If it persists, please create a bug report so we can fix it.'
          });
        });
    }

    function handleCallback(cb, response, rejection) {
      if (cb && typeof cb === 'function') {
        if (response) {
          return cb(null, response.data);
        }
        cb(rejection);
      }
    }
    return studentData;
  }]);
};
