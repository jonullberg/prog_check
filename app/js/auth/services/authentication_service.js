'use strict';

module.exports = function(app) {
  app.factory('AuthenticationService', ['$cookies', function($cookies) {
    var auth = {};
    auth.isLogged = false;
    auth.user = $cookies.getObject('user');
    return auth;
  }]);
};
