module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .config(['$provide', exceptionHandler])
    .run(['$route', reloadRoute])

  function exceptionHandler($provide) {
    $provide.decorator('$exceptionHandler', ['$delegate', 'errorLogService', function($delegate, exceptionHandlerFactory) {
      return exceptionHandlerFactory($delegate);
    }]);
  }

  function reloadRoute($route) {
    $route.reload();
  }

}
