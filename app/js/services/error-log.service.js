var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .factory('errorLogService', ['$injector', '$log', '$window', errorLogService]);
    function errorLogService($injector, $log, $window) {
        return function ($delegate) {
            return function (exception, cause) {
                var $http = $injector.get('$http');
                try {
                    var errorMessage = exception.toString();
                    StackTrace
                        .fromError(exception)
                        .then(function (stackframes) {
                        var stringifiedStack = stackframes.map(function (sf) {
                            return sf.toString();
                        }).join('\n');
                        $http.post('/api/client-log', {
                            source: 'client',
                            errorUrl: $window.location.href,
                            errorMessage: errorMessage,
                            stackTrace: stringifiedStack,
                            cause: (cause || '')
                        })
                            .then(function (response) {
                        })
                            .catch(function (rejection) {
                        });
                    });
                }
                catch (loggingError) {
                    $log.warn('Error logging failed');
                    $log.log(loggingError);
                }
                $delegate(exception, cause);
            };
        };
    }
})(ProgCheck || (ProgCheck = {}));
