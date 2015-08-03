'use strict';

module.exports = function(app) {
  app.factory('StudentAuthService', ['$http', '$base64', '$cookies', 'AuthenticationService', function($http, $base64, $cookies, AuthenticationService) {
    return {
      signIn: function(student, callback) {
        var encoded = $base64.encode(student.username + ':' + student.pin);
        $http
          .get('/api/sign_in/students', {
            headers: {
              'Authorization': 'Basic ' + encoded
            }
          })
          .success(function(data) {
            $cookies.put('token', data.token);
            $cookies.putObject('user', data.user);
            AuthenticationService.isLogged = true;
            callback(null);
          })
          .error(function(data) {
            callback(data);
          });
      },

      logout: function() {
        $cookies.put('token', '');
        $cookies.put('user', '');
        AuthenticationService.isLogged = false;
      },

      isSignedIn: function() {
        return !!($cookies.get('token') && $cookies.get('token').length);
      }
    };
  }]);
};
