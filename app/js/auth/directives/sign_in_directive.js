'use strict';

module.exports = function(app) {
  app.directive('signUpDirective', function() {
    return {
      restrict: 'ECA',
      replace: true,
      templateUrl: '/templates/directives/sign_in.html'
    };
  });
};
