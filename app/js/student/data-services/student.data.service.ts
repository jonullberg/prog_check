module ProgCheck {

  'use strict';

  angular
    .module('progCheck')
    .factory('StudentData', ['$rootScope', '$http', 'Errors', 'StudentTestData', 'AuthenticationService', studentData])

  // module.exports = function(app) {
  //   app.factory('StudentData', ['$rootScope', '$http', 'Errors', 'StudentTestData', 'AuthenticationService', studentData])
  // }
  function studentData($rootScope, $http, Errors, Tests, Auth) {
    var studentData = {
      Tests: Tests,
      user: Auth.getUser(),
      getUser: function() {
        return this.user;
      },
      setUser: function(user) {
        this.user = user;
        $rootScope.$broadcast('user:changed');
        return;
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
  }

}
