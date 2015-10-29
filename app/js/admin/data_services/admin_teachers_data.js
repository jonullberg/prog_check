/**
 * A module to hold all teachers/users for the admin to see
 * Created by Jonathan Ullberg on 10/23/2015
 */
'use strict';

module.exports = function(app) {
  app.factory('AdminTeachersData', ['$http', '$rootScope', 'Errors', function ($http, $rootScope, Errors) {

    var adminTeachersData = {
      teachers: [],
      teacher: null,
      getTeachers: function() {},
      setTeachers: function() {}
    }

    return adminTeachersData;
  }]);
};
