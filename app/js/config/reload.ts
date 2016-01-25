module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .run(['$route', reloadRoute])

  function reloadRoute($route) {
    $route.reload();
  }

}
