'use strict';

module.exports = function(app) {
  app.factory('TeacherData', ['Students', 'Attempts', function(Students, Attempts) {
    return {
      Students: Students,
      Attempts: Attempts
    };
  }]);
};
