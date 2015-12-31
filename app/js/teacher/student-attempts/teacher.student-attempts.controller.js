var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('StudentAttemptsCtrl', ['$scope', '$filter', '$routeParams', 'TeacherData', studentAttemptsCtrl]);
    function studentAttemptsCtrl($scope, $filter, $routeParams, TeacherData) {
    }
})(ProgCheck || (ProgCheck = {}));
