'use strict';

module.exports = function(app) {
  app.factory('UserService', ['$http', '$base64', '$cookies', 'AuthenticationService', 'jwtHelper', function($http, $base64, $cookies, AuthenticationService, jwtHelper) {
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
            var tokenPayload = jwtHelper.decodeToken(data.token);
            $cookies.put('token', data.token);
            AuthenticationService.setUser(tokenPayload.sub)
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
            var tokenPayload = jwtHelper.decodeToken(data.token);
            AuthenticationService.setUser(tokenPayload.sub);
            callback(null, response);
          }, function(err) {
            callback(err);
          });
      },
      create: function(user, callback) {
        $http
          .post('/api/create_user', user)
          .then(function(response) {
            var data = response.data;
            $cookies.put('token', response.data.token);
            var tokenPayload = jwtHelper.decodeToken(data.token);
            AuthenticationService.setUser(tokenPayload.sub);
            callback(null, response);
          })
          .catch(function(rejection) {
            callback(rejection);
          });
      },

      logout: function() {
        $cookies.remove('token');
        AuthenticationService.setUser(null);
      },
      authToken: function(token, cb) {
        $http
          .get('/api/auth_token', {
            'headers': {
              'Authentication': 'Bearer ' + token
            }
          })
          .then(function(response) {
            var data = response.data;
            $cookies.put('token', data.token);
            var tokenPayload = jwtHelper.decodeToken(data.token);
            AuthenticationService.setUser(tokenPayload.sub);
            handleCallback(cb, response);
          })
          .catch(function(rejection) {
            $cookies.remove('token');
            AuthenticationService.setUser(null);
            handleCallback(cb, null, rejection);
          });
      }
    };
  }]);
};
function handleCallback(cb, response, rejection) {
  if (cb && typeof cb === 'function') {
    if (response) {
      cb(null, response);
    } else if (rejection) {
      cb(rejection);
    }
  }
}
