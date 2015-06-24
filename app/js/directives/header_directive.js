'use strict';

module.exports = function(app) {
  app.directive('headerDirective', function() {
    return {
      resrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/header.html'
    };
  });
};
