var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('ResetPasswordCtrl', ['$scope', '$http', '$routeParams', '$location', resetPasswordCtrl]);
    function resetPasswordCtrl($scope, $http, $routeParams, $location) {
        $scope.resetPassword = function (data) {
            if (data.newPassword === data.confirmPassword) {
                $http.post('/api/reset/' + $routeParams.resetToken, data)
                    .then(function (data) {
                    $location.url('/reset/success');
                }, function (err) {
                    console.log(err);
                });
            }
        };
        $scope.pwdValidationText = 'Your password should: ';
        $scope.pwdValidationWarnings = {
            'length': {
                'className': 'red',
                'warning': 'be between 8 and 16 characters'
            },
            'capital': {
                'className': 'red',
                'warning': 'contain a capital letter'
            },
            'lower': {
                'className': 'red',
                'warning': 'contain a lowercase letter'
            },
            'number': {
                'className': 'red',
                'warning': 'contain a number'
            },
            'matches': {
                'className': 'red',
                'warning': 'match the password confirmation.'
            }
        };
    }
})(ProgCheck || (ProgCheck = {}));
