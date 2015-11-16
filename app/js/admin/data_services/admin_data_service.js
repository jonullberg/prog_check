/**
 * A factory for holding an Admin's different data stores that they need
 * Created by Jonathan Ullberg on 10/23/2015
 */
'use strict';

module.exports = function(app) {
  app.factory('AdminData', ['AdminStandardsData', 'AdminTestsData', 'AdminTeachersData', 'AuthenticationService', function (Standards, Tests, Teachers, AuthService) {
    var adminData = {
      user: AuthService.getUser(),
      Standards: Standards,
      Tests: Tests,
      Teachers: Teachers,
      getUser: function() {
        return this.user;
      },
      setUser: function(user) {
        this.user = user;
        return;
      }
    };

    return adminData;
  }]);
};
