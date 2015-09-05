'use strict';

module.exports = function(app) {
  app.factory('TeacherData', ['$rootScope', 'Students', 'Attempts', function($rootScope, Students, Attempts) {

    return {
      Students: Students,
      Attempts: Attempts
    };
  }]);
};
