var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .factory('stackTraceService', stacktraceService);
    function stacktraceService() {
        return StackTrace;
    }
})(ProgCheck || (ProgCheck = {}));
