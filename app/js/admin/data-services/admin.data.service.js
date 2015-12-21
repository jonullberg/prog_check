var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .factory('AdminData', ['AuthenticationService', 'AdminStandardsData', 'AdminTestsData', 'AdminTeachersData', 'jwtHelper', adminData]);
    function adminData(Auth, Standards, Tests, Teachers, jwtHelper) {
        return {
            user: Auth.getUser(),
            Standards: Standards,
            Tests: Tests,
            Teachers: Teachers,
            getUser: function () {
                return this.user;
            },
            setUser: function (user) {
                this.user = user;
                return;
            }
        };
    }
})(ProgCheck || (ProgCheck = {}));
