module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .directive('pcDeleteAlert', pcDeleteAlert)

  function pcDeleteAlert() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/delete-alert.tmpl.html',
      scope: {
        item: '=',
        delete: '&',
        toggle: '&'
      },
      link: function(scope, iEl, iAttr) {
      }
    };
  }

}
