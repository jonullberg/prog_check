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
            $cookies.putObject('user', data.user);
            AuthenticationService.role = $cookies.getObject('user').role;
            AuthenticationService.isLogged = true;
            callback(null, response);
          }, function(err) {
            callback(err);
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
            $cookies.putObject('user', data.user);
            AuthenticationService.role = $cookies.getObject('user').role;
            AuthenticationService.isLogged = true;
            callback(null, response);
          }, function(err) {
            callback(err);
          });
      },
      create: function(user, callback) {
        $http
          .post('/api/create_user', user)
          .then(function(data) {
            $cookies.put('token', data.token);
            $cookies.putObject('user', data.user);
            AuthenticationService.role = $cookies.getObject('user').role;
            AuthenticationService.isLogged = true;
            callback(null);
          }, function(err) {
            callback(err);
          });
      },

      logout: function() {
        $cookies.put('token', '');
        $cookies.putObject('user', {});
        AuthenticationService.role = null;
        AuthenticationService.isLogged = false;
      },

      isSignedIn: function() {
        return AuthenticationService.isLogged;
      }
    };
  }]);
};
