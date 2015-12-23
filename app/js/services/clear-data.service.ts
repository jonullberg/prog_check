module ProgCheck {
  angular
    .module('progCheck')
    .factory('clearData', ['AdminData', 'TeacherData', 'StudentData', 'AuthenticationService', clearData])
  function clearData(Admin, Teacher, Student, Auth) {
    return {
        clear: clear
    }
    function clear() {
      Admin.Standards.setStandards(null);
      Admin.Standards.setStandard(null);
      Admin.Standards.setGoal(null);
      Admin.Tests.setTests(null);
      Admin.Tests.setTest(null);
      Admin.Tests.setQuestion(null);
      Admin.Teachers.setTeachers(null);
      Teacher.Students.setStudent(null);
      Teacher.Students.setStudents(null);
      Teacher.Students.setGoal(null);
      Teacher.Standards.setStandards(null);
      Teacher.Standards.setStandard(null);
      Teacher.Standards.setGoal(null);
      Teacher.Attempts.setAttempts(null);
      Teacher.Attempts.setAttempt(null);
      Teacher.Attempts.setResults(null);
      Student.Tests.setTests(null);
      Student.Tests.setTest(null);
      Auth.setUser(null);
    }
  }
}
