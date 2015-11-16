'use strict';

module.exports = function(app) {
  app.factory('TeacherData', ['TeacherStudentsData', 'TeacherAttemptsData', 'TeacherStandardsData', 'AuthenticationService', function(Students, Attempts, Standards, AuthService) {
    var teacherData = {
      user: AuthService.getUser(),
      Students: Students,
      Attempts: Attempts,
      Standards: Standards,
      getUser: function() {
        return this.user;
      }
    };
    return teacherData;
  }]);
};
