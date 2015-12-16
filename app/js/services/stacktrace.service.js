/**
 * A service for dealing with stack traces in Angular app
 * For use in the Prog Check testing application
 * Created by Jonathan Ullberg on 12/02/2015
 */
/// <reference path="../../../tools/typings/tsd.d.ts" />
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
