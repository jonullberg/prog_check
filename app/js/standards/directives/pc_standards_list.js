'use strict';

module.exports = function(app) {
  app.directive('pcStandardsList', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/standards/standards_list.html',
      scope: {
        show: '&',
        standards: '=',
        quantity: '&',
        getAll: '&',
        toggleEdit: '&'
      }
    };
  });
};
