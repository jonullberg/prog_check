'use strict';

module.exports = function(app) {
  app.factory('AuthenticationService', ['$cookies', function($cookies) {
    var auth = {
      isLogged: false
    };
    console.log($cookies.getObject('user'));
    if ($cookies.getObject('user') === undefined || null) {
      auth.role = null;
    } else {
      auth.role = $cookies.getObject('user').role;
    }
    return auth;
  }]);
};
