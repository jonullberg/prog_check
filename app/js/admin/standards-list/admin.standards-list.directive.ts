'use strict';

export = function(app) {
  app.directive('pcStandardsList', pcStandardsList);
};
function pcStandardsList() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: '/js/admin/standards-list/standards-list.html',
    controller: 'StandardsListCtrl',
    controllerAs: 'sl'
  };
}