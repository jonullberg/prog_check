'use strict';
module.exports = function (app) {
    app.factory('AdminData', ['$cookies', 'AdminStandardsData', 'AdminTestsData', 'AdminTeachersData', 'jwtHelper', function ($cookies, Standards, Tests, Teachers, jwtHelper) {
            var adminData = {
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
            return adminData;
        }]);
};
