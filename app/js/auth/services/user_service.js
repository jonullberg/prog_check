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
          .then(function(data) {
            // $cookies.put('token', data.token);
            // $cookies.putObject('user', data.user);
            // AuthenticationService.role = $cookies.getObject('user').role;
            // AuthenticationService.isLogged = true;
            console.log(data);
            // callback(null);
          }, function(err) {
            console.log(err);
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
          .success(function(data) {
            $cookies.put('token', data.token);
            $cookies.putObject('user', data.user);
            AuthenticationService.role = $cookies.getObject('user').role;
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
            $cookies.putObject('user', data.user);
            AuthenticationService.role = $cookies.getObject('user').role;
            AuthenticationService.isLogged = true;
            callback(null);
          })
          .error(function(data) {
            callback(data);
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
