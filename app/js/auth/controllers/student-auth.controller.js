var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('StudentAuthCtrl', ['$scope', '$location', 'UserService', 'Errors', studentAuthCtrl]);
    function studentAuthCtrl($scope, $location, UserService, Errors) {
        $scope.authSubmit = function (student) {
            UserService.studentSignIn(student, function (err, data) {
            });
        };
    }
})(ProgCheck || (ProgCheck = {}));
