'use strict';

module.exports = function(app) {
  app.directive('signUpDirective', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/sign_up.html',
    };
  });
};
