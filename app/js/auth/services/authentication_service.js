'use strict';

module.exports = function(app) {
  app.factory('AuthenticationService', ['$cookies', '$rootScope', 'jwtHelper', function($cookies, $rootScope, jwtHelper) {
    var user;
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
