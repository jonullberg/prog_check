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
          .then(function(response) {
            var data = response.data;
            $cookies.put('token', data.token);
            AuthenticationService.user = data.user;
            AuthenticationService.isLogged = true;
            callback(null, response);
          })
          .catch(function(rejection) {
            callback(rejection);
          });
      },
      studentSignIn: function(student, callback) {
        var encoded = $base64.encode(student.username + ':' + student.pin);
        $http
          .get('/api/sign_in/students', {
            headers: {
              'Authorization': 'Basic ' + encoded
            }
          })
          .then(function(response) {
            var data = response.data
            $cookies.put('token', data.token);
            AuthenticationService.user = data.user;
            AuthenticationService.isLogged = true;
            callback(null, response);
          }, function(err) {
            callback(err);
          });
      },
      create: function(user, callback) {
        $http
          .post('/api/create_user', user)
          .then(function(response) {
            $cookies.put('token', response.data.token);
            AuthenticationService.user = response.data.user;
            AuthenticationService.isLogged = true;
            callback(null, response);
          })
          .catch(function(rejection) {
            callback(rejection);
          });
      },

      logout: function() {
        $cookies.put('token', '');
        AuthenticationService.user = null;
        AuthenticationService.isLogged = false;
      },
      authToken: function(token, callback) {
        $http
          .get('/api/auth_token', {
            'headers': {
              'Authentication': 'Bearer ' + token
            }
          })
          .then(function(response) {
            $cookies.put('token', response.data.token);
            AuthenticationService.user = response.data.user;
            AuthenticationService.isLogged = true;
            callback(null, response);
          })
          .catch(function(rejection) {
            $cookies.put('token', null);
            AuthenticationService.user = null;
            AuthenticationService.isLogged = false;
            callback(rejection);
          });
      },
      isSignedIn: function() {
        return AuthenticationService.isLogged;
      }
    };
  }]);
};
