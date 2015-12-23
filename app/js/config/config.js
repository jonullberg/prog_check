var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .config(['$provide', exceptionHandler]);
    function exceptionHandler($provide) {
        $provide.decorator('$exceptionHandler', ['$delegate', 'errorLogService', function ($delegate, exceptionHandlerFactory) {
                return exceptionHandlerFactory($delegate);
            }]);
    }
})(ProgCheck || (ProgCheck = {}));
