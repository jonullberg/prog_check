'use strict';

module.exports = function(app) {
  app.factory('AuthenticationService', ['$cookies', '$rootScope', function($cookies, $rootScope) {
    var auth = {
      isLogged: false,
      user: null,
      getUser: function() {
        return this.user;
      },
      setUser: function(user) {
        this.user = user;
        $rootScope.$broadcast('user:changed', this.user);
        return;
      }
    };
    if ($cookies.get('token') && $cookies.get('token').length && this.user) {
      auth.isLogged = true
    }
    return auth;
  }]);
};
