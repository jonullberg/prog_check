'use strict';

module.exports = function(app) {
  app.factory('TokenInterceptor', ['$q', '$cookies', '$location', 'AuthenticationService', function($q, $cookies, $location, AuthenticationService){
    return {
      request: function(config) {
        var token = $cookies.get('token');
        var role;
        if (AuthenticationService.getUser() && AuthenticationService.getUser().role) {
          role = AuthenticationService.getUser().role;
        } else {
          role = null;
        }
        config.headers['Authorization'] = config.headers['Authorization'] ?
          config.headers['Authorization'] : 'Bearer ' + token;
        config.headers['role'] = role;
        return config;
      },
      response: function(response) {
        if (response !== null && (response.status >= 200 && response.status <= 299) && $cookies.get('token') && !AuthenticationService.isLogged) {
          AuthenticationService.isLogged = true;
        }
        return response || $q.when(response);
      },

      responseError: function(rejection) {
        if (rejection !== null && (rejection.status >= 400 && rejection.status <= 599) && ($cookies.get('token') || AuthenticationService.isLogged)) {
          $cookies.put('token', '');
          AuthenticationService.isLogged = false;
        }
        return $q.reject(rejection);
      }
    };
  }]);
};
