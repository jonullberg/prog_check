var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .factory('TokenInterceptor', ['$q', '$window', '$location', tokenInterceptor]);
    function tokenInterceptor($q, $window, $location) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.localStorage['token'] && !config.headers.authorization) {
                    config.headers.authorization = 'Bearer ' + $window.localStorage['token'];
                }
                var role;
                return config;
            },
            response: function (response) {
                if (response !== null && (response.status >= 200 && response.status <= 299)) {
                }
                return response || $q.when(response);
            },
            responseError: function (rejection) {
                if (rejection !== null && (rejection.status >= 400 && rejection.status <= 599) && $window.localStorage['token']) {
                    $window.localStorage.removeItem('token');
                }
                return $q.reject(rejection);
            }
        };
    }
})(ProgCheck || (ProgCheck = {}));
