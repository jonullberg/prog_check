'use strict';

export = function(app) {
  app.directive('pcSingleStandard', pcSingleStandard);
};

function pcSingleStandard() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/js/admin/single-standard/single-standard.html',
    controller: 'SingleStandardCtrl',
    controllerAs: 'ss'
  };
}