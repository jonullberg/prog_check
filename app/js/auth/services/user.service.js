var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .factory('UserService', ['$http', '$base64', '$window', 'AuthenticationService', 'jwtHelper', 'clearData', userService]);
    function userService($http, $base64, $window, AuthenticationService, jwtHelper, clearData) {
        return {
            signIn: function (user, callback) {
                var encoded = $base64.encode(user.email + ':' + user.password);
                $http
                    .get('/api/sign_in', {
                    headers: {
                        'Authorization': 'Basic ' + encoded
                    }
                })
                    .then(function (response) {
                    var data = response.data;
                    var tokenPayload;
                    try {
                        tokenPayload = jwtHelper.decodeToken(data.token);
                    }
                    catch (e) {
                        console.log('That token was invalid');
                    }
                    $window.localStorage['token'] = data.token;
                    AuthenticationService.setUser(tokenPayload.sub);
                    callback(null, response);
                })
                    .catch(function (rejection) {
                    callback(rejection);
                });
            },
            studentSignIn: function (student, callback) {
                var encoded = $base64.encode(student.username + ':' + student.pin);
                $http
                    .get('/api/students/sign_in', {
                    headers: {
                        'Authorization': 'Basic ' + encoded
                    }
                })
                    .then(function (response) {
                    var data = response.data;
                    $window.localStorage['token'] = data.token;
                    var tokenPayload;
                    try {
                        tokenPayload = jwtHelper.decodeToken(data.token);
                    }
                    catch (e) {
                        console.log('That token was invalid');
                        $window.localStorage.removeItem('token');
                    }
                    AuthenticationService.setUser(tokenPayload.sub);
                    callback(null, response);
                })
                    .catch(function (rejection) {
                    callback(rejection);
                });
            },
            create: function (user, callback) {
                $http
                    .post('/api/create_user', user)
                    .then(function (response) {
                    var data = response.data;
                    $window.localStorage['token'] = response.data.token;
                    var tokenPayload;
                    try {
                        tokenPayload = jwtHelper.decodeToken(data.token);
                    }
                    catch (e) {
                        console.log('Invalid token');
                    }
                    AuthenticationService.setUser(tokenPayload.sub);
                    callback(null, response);
                })
                    .catch(function (rejection) {
                    callback(rejection);
                });
            },
            logout: function () {
                $window.localStorage.removeItem('token');
                AuthenticationService.setUser(null);
                clearData.clear();
            },
            authToken: function (token, cb) {
                $http
                    .get('/api/auth_token', {
                    'headers': {
                        'Authentication': 'Bearer ' + token
                    }
                })
                    .then(function (response) {
                    var data = response.data;
                    $window.localStorage['token'] = data.token;
                    var tokenPayload;
                    try {
                        tokenPayload = jwtHelper.decodeToken(data.token);
                    }
                    catch (e) {
                        console.log('err', e);
                    }
                    AuthenticationService.setUser(tokenPayload.sub);
                    handleCallback(cb, response, null);
                })
                    .catch(function (rejection) {
                    $window.localStorage.removeItem('token');
                    AuthenticationService.setUser(null);
                    handleCallback(cb, null, rejection);
                });
            }
        };
        function handleCallback(cb, response, rejection) {
            if (cb && typeof cb === 'function') {
                if (response) {
                    cb(null, response);
                }
                else if (rejection) {
                    cb(rejection);
                }
            }
        }
    }
})(ProgCheck || (ProgCheck = {}));
