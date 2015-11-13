'use strict';

module.exports = function(app) {
  app.factory('TeacherData', ['TeacherStudentsData', 'TeacherAttemptsData', 'TeacherStandardsData', function(Students, Attempts, Standards) {
    return {
      Students: Students,
      Attempts: Attempts,
      Standards: Standards
    };
  }]);
};
