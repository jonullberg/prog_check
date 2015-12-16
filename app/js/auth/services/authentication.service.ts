module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .factory('AuthenticationService', ['$cookies', '$rootScope', '$location', 'jwtHelper', authenticationService])

  function authenticationService($cookies, $rootScope, $location, jwtHelper) {
    var user;
    var token;
    try {
      token = jwtHelper.decodeToken($cookies.get('token'));
    } catch (e) {
      console.log('That token was invalid', e);
      $cookies.remove('token');
      $location.path('/sign-in');
    }
    if ($cookies.get('token') && token) {
      user = token.sub;
    } else {
      user = null;
    }
    var auth = {
      user: user,
      getUser: function() {
        return this.user;
      },
      setUser: function(user) {
        this.user = user;
        $rootScope.$broadcast('user:changed', this.user);
        return;
      }
    };
    return auth;
  }
}
