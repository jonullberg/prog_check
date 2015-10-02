'use strict';

module.exports = function(app) {
  app.factory('AuthenticationService', ['$cookies', function($cookies) {
    var auth = {
      isLogged: false,
      user: null
    };
    if ($cookies.get('token') && $cookies.get('token').length) {
      auth.isLogged = true;
    }
    auth.user = $cookies.getObject('user');
    return auth;
  }]);
};
