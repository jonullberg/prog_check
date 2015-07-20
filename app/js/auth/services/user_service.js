'use strict';

module.exports = function(app) {
  app.factory('UserService', ['$http', '$base64', '$cookies', 'AuthenticationService', function($http, $base64, $cookies, AuthenticationService) {
    return {
      signIn: function(user, callback) {
        var encoded = $base64.encode(user.email + ':' + user.password);
        $http
          .get('/api/sign_in', {
            headers: {
              'Authorization': 'Basic ' + encoded
            }
          })
          .success(function(data) {
            $cookies.put('token', data.token);
            $cookies.put('fullName', data.fullName);
            $cookies.put('role', data.role);
            $cookies.put('userId', data.userId);
            AuthenticationService.isLogged = true;
            callback(null);
          })
          .error(function(data) {
            callback(data);
          });
      },

      create: function(user, callback) {
        $http
          .post('/api/create_user', user)
          .success(function(data) {
            $cookies.put('token', data.token);
            $cookies.put('fullName', data.fullName);
            $cookies.put('role', data.role);
            $cookies.put('userId', data.userId);
            AuthenticationService.isLogged = true;
            callback(null);
          })
          .error(function(data) {
            callback(data);
          });
      },

      logout: function() {
        $cookies.put('token', '');
        $cookies.put('fullName', '');
        $cookies.put('role', '');
        AuthenticationService.isLogged = false;
      },

      isSignedIn: function() {
        return !!($cookies.get('token') && $cookies.get('token').length);
      }
    };
  }]);
};
