'use strict';

module.exports = function(app) {
  app.factory('AuthenticationService', ['$cookies', function($cookies) {
    var auth = {
      isLogged: false,
    };
    if ($cookies.getObject('user') === null) {
      auth.role = null;
    } else {
      auth.role = $cookies.getObject('user').role;
    }
    return auth;
  }]);
};
