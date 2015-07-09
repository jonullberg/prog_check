'use strict';

module.exports = function(app) {
  app.factory('AuthenticationService', function() {
    var auth = {
      isLogged: false;
    };

    return auth;
  });
};
