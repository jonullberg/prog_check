'use strict';

module.exports = function(app) {
  app.factory('AuthenticationService', ['$cookies', function($cookies) {
    var auth = {
      isLogged: false,
      role: $cookies.get('role')
    };
    return auth;
  }]);
};
