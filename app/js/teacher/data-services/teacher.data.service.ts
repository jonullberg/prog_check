module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .factory('TeacherData', ['TeacherStudentsData', 'TeacherAttemptsData', 'TeacherStandardsData', 'AuthenticationService', teacherData])

  function teacherData(Students, Attempts, Standards, AuthService) {
    return {
      Students: Students,
      Attempts: Attempts,
      Standards: Standards
    };
  }
}
