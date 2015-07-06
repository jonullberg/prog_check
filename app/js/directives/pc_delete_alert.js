'use strict';

module.exports = function(app) {
  app.directive('deleteAlert', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/delete_alert.html'
    }
  })
}
