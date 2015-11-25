'use strict';

module.exports = function(app) {
  app.factory('AuthenticationService', ['$cookies', '$rootScope', '$location', 'jwtHelper', function($cookies, $rootScope, $location, jwtHelper) {
    var user;
    var token;
    try {
      token = jwtHelper.decodeToken($cookies.get('token'));
    } catch (e) {
      console.log('That token was invalid', e);
      $cookies.remove('token');
      $location.path('/sign-in')
    }
    if ($cookies.get('token') && jwtHelper.decodeToken($cookies.get('token'))) {
      user = jwtHelper.decodeToken($cookies.get('token')).sub;
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
  }]);
};
