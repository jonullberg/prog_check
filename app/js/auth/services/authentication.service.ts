module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .factory('AuthenticationService', ['$window', '$rootScope', '$location', 'jwtHelper', authenticationService])

  function authenticationService($window, $rootScope, $location, jwtHelper) {
    var user;
    var token;
    try {
      token = jwtHelper.decodeToken($window.localStorage['token']);
    } catch (e) {
      console.log('That token was invalid', e);
      $window.localStorage.removeItem('token');
      $location.path('/sign-in');
    }
    if ($window.localStorage['token'] && token) {
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
      },
      clear: function() {
        this.user = null;
      }
    };
    function setToken(token) {
      if (token) {
        $window.localStorage['token'] = token;
        var parsedToken = jwtHelper.decodeToken(token);
        this.setUser(token.sub);
      }
    }
    return auth;
  }
}
