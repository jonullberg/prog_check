var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('StudentAuthCtrl', ['$scope', '$cookies', '$location', 'UserService', 'Errors', studentAuthCtrl]);
    function studentAuthCtrl($scope, $cookies, $location, UserService, Errors) {
        $scope.authSubmit = function (student) {
            UserService.studentSignIn(student, function (err) {
                if (err) {
                    return Errors.addError({
                        'msg': 'There was an error signing in'
                    });
                }
                $location.path('/student/home');
            });
        };
    }
})(ProgCheck || (ProgCheck = {}));
