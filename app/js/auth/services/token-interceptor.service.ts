module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .factory('TokenInterceptor', ['$q', '$cookies', '$location', 'AuthenticationService', tokenInterceptor])

  function tokenInterceptor($q, $cookies, $location, AuthenticationService){
    return {
      request: function(config) {
        config.headers = config.headers || {};
        if ($cookies.get('token') && !config.headers.authorization) {
          config.headers.authorization = 'Bearer ' + $cookies.get('token');
        }
        var role;
        return config;
      },
      response: function(response) {
        if (response !== null && (response.status >= 200 && response.status <= 299) && $cookies.get('token')) {
        }
        return response || $q.when(response);
      },

      responseError: function(rejection) {
        if (rejection !== null && (rejection.status >= 400 && rejection.status <= 599) && $cookies.get('token')) {
          $cookies.remove('token');
        }
        return $q.reject(rejection);
      }
    };
  }
}
