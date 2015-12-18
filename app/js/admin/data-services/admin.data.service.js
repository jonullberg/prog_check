/**
 * A factory for holding an Admin's different data stores that they need
 * Created by Jonathan Ullberg on 10/23/2015
 */
var ProgCheck;
(function (ProgCheck) {
    'use strict';
    angular
        .module('progCheck')
        .factory('AdminData', ['$cookies', 'AdminStandardsData', 'AdminTestsData', 'AdminTeachersData', 'jwtHelper', adminData]);
    // export = function(app) {
    //   app.factory('AdminData', ['$cookies', 'AdminStandardsData', 'AdminTestsData', 'AdminTeachersData', 'jwtHelper', adminData]);
    function adminData($cookies, Standards, Tests, Teachers, jwtHelper) {
        return {
            user: jwtHelper.decodeToken($cookies.get('token')).sub,
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
