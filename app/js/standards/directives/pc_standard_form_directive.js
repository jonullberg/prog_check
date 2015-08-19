'use strict';

module.exports = function(app) {
  app.directive('pcStandardForm', function() {

    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/standards/standard_form.html',
      scope: {
        buttonText: '=',
        standard: '='
      }
    };
  });
};
