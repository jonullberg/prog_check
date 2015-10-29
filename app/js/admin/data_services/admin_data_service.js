/**
 * A factory for holding an Admin's different data stores that they need
 * Created by Jonathan Ullberg on 10/23/2015
 */
'use strict';

module.exports = function(app) {
  app.factory('AdminData', ['AdminStandardsData', 'AdminTestsData', 'AdminTeachersData', function (Standards, Tests, Teachers) {
    var adminData = {
      profile: null,
      Standards: Standards,
      Tests: Tests,
      Teachers: Teachers,
      getProfile: function() {
        return this.profile;
      },
      setProfile: function(profile) {
        this.profile = profile;
        return;
      }
    };

    return adminData;
  }]);
};
