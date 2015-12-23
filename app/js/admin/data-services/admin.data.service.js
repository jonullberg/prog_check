var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .factory('AdminData', ['AuthenticationService', 'AdminStandardsData', 'AdminTestsData', 'AdminTeachersData', 'jwtHelper', adminData]);
    function adminData(Auth, Standards, Tests, Teachers, jwtHelper) {
        return {
            Standards: Standards,
            Tests: Tests,
            Teachers: Teachers
        };
    }
})(ProgCheck || (ProgCheck = {}));
