'use strict';

export = function(app) {
  app.directive('pcTestsList', pcTestsList);
};
function pcTestsList() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/js/admin/tests-list/tests-list.html',
      controller: 'TestsListCtrl'
    };
  }