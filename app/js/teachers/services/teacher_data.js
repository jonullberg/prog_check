'use strict';

module.exports = function(app) {
  app.factory('TeacherData', ['$rootScope', 'Students', function ($rootScope, Students) {

    return {
      students: Students,

    };
  }])
}
