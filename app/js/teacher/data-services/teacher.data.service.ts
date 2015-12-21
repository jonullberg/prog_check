module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .factory('TeacherData', ['TeacherStudentsData', 'TeacherAttemptsData', 'TeacherStandardsData', 'AuthenticationService', teacherData])

  function teacherData(Students, Attempts, Standards, AuthService) {
    return {
      user: AuthService.getUser(),
      Students: Students,
      Attempts: Attempts,
      Standards: Standards,
      getUser: function() {
        return this.user;
      },
      setUser: function(user) {
        this.user = user;
        return;
      }
    };
  }
}
