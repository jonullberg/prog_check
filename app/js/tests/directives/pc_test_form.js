'use strict';

module.exports = function(app) {
  app.directive('pcTestForm', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/test_form.html',
      scope: {
        test: '=',
        buttonText: '=',
        save: '&'
      }
    };
  });
};
