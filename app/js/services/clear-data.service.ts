module ProgCheck {
  angular
    .module('progCheck')
    .factory('clearData', ['AdminData', 'TeacherData', 'StudentData', 'AuthenticationService', clearData])
  function clearData(Admin, Teacher, Student, Auth) {
    return {
        clear: clear
    }
    function clear() {
      Admin.Standards.clear();
      Admin.Tests.clear();
      Admin.Teachers.clear();
      Teacher.Students.clear();
      Teacher.Standards.clear();
      Teacher.Attempts.clear();
      Student.Tests.clear();
      Auth.clear();
    }
  }
}
