'use strict';

module.exports = function(app) {
  app.factory('TokenInterceptor', ['$q', '$cookies', 'AuthenticationService', function($q, $cookies, AuthenticationService){
    return {
      response: function(response) {
        if (response !== null && (response.status >= 200 && response.status <= 299) && $cookies.get('token') && !AuthenticationService.isLogged) {
          AuthenticationService.isLogged = true;
        }
        return response || $q.when(response);
      },

      responseError: function(rejection) {
        if (rejection !== null && (rejection.status >= 400 && rejection.status <= 599) && ($cookies.get('token') || AuthenticationService.isLogged)) {
          $cookies.put('token', '');
          $cookies.putObject('user', null);
          AuthenticationService.isLogged = false;
        }
        return $q.reject(rejection);
      }
    };
  }]);
};
