var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .controller('AuthCtrl', ['$scope', '$location', '$uibModal', 'UserService', 'USStates', 'AuthenticationService', 'Errors', authCtrl]);
    function authCtrl($scope, $location, $uibModal, UserService, USStates, AuthenticationService, Errors) {
        $scope.initUser = function () {
            $scope.user = {
                type: 'student',
                usernameText: 'Username',
                passwordText: 'PIN',
                usernameType: 'text'
            };
        };
        $scope.userChange = function (user) {
            if (user.type === 'student') {
                user.usernameText = 'Username';
                user.passwordText = 'PIN';
                user.usernameType = 'text';
            }
            else if (user.type === 'teacher') {
                user.usernameText = 'Email';
                user.passwordText = 'Password';
                user.usernameType = 'email';
            }
        };
        $scope.states = USStates;
        $scope.changeView = function (url) {
            $location.path(url);
        };
        $scope.termsModal = function () {
            $uibModal.open({
                animation: true,
                templateUrl: '/templates/modals/terms_and_conditions.html',
                size: 'lg',
                controller: 'TermsCtrl'
            });
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
        $scope.authSubmit = function (user) {
            // Is this is a sign-up?
            if (user.passwordConfirmation) {
                // Is the form valid?
                if ($scope.signUpForm.$valid) {
                    UserService.create(user, function (err, user) {
                        if (err) {
                            return Errors.addError({
                                'msg': 'Could not sign in'
                            });
                        }
                        var path = user.role === 'admin' ?
                            path = '/admin/' + user._id + '/home' :
                            path = '/teacher/' + user._id + '/home';
                        $location.path(path);
                    });
                }
            }
            else {
                // Is the user a teacher or student?
                if (user.type === 'teacher') {
                    UserService.signIn(user, function (err, data) {
                        if (err) {
                            $scope.errorMessage = 'Wrong Password or Email';
                            return;
                        }
                        $location.path('/home');
                    });
                }
                else if (user.type === 'student') {
                    user.pin = user.password;
                    user.username = user.email;
                    UserService.studentSignIn(user, function (err) {
                        if (err) {
                            $scope.errorMessage = 'Wrong Username or PIN';
                            return;
                        }
                        $location.path('/student/home');
                    });
                }
            }
        };
        $scope.closeAlert = function () {
            $scope.errorMessage = null;
        };
        $scope.resetPassword = function () {
            $uibModal.open({
                animation: true,
                templateUrl: '/templates/auth/forgot-password.html',
                controller: 'ForgotPasswordCtrl',
                size: 'lg'
            });
        };
    }
})(ProgCheck || (ProgCheck = {}));
