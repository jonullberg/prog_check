'use strict';

module.exports = function(app) {
  app.directive('pcFooter', [function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/footer.html',
      controller: 'FooterCtrl'
    };
  }]);
};
