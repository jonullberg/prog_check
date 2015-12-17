module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .factory('TeacherData', ['TeacherStudentsData', 'TeacherAttemptsData', 'TeacherStandardsData', 'AuthenticationService', teacherData])
  // export = function(app) {
  //   app.factory('TeacherData', ['TeacherStudentsData', 'TeacherAttemptsData', 'TeacherStandardsData', 'AuthenticationService', teacherData]);
  function teacherData(Students, Attempts, Standards, AuthService) {
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
  }
}
