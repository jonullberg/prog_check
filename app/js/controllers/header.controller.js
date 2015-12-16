var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('HeaderCtrl', ['$scope', 'UserService', headerCtrl]);
    function headerCtrl($scope, auth) {
        $scope.changeView = function (url) {
        };
    }
})(ProgCheck || (ProgCheck = {}));
