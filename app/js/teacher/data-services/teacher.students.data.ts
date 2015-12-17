module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .factory('TeacherStudentsData', ['$http', '$rootScope', 'Errors', teacherStudentsData])
  // export = function(app) {
  //   app.factory('TeacherStudentsData', ['$http', '$rootScope', 'Errors', teacherStudentsData])
  // }
  function teacherStudentsData($http, $rootScope, Errors) {

    var teacherStudentsData = {
      student: null,
      students: null,
      goal: null,
      getStudents: function() {
        return this.students;
      },
      setStudents: function(students) {
        this.students = students;
        $rootScope.$broadcast('students:changed', this.students);
        return;
      },
      getStudent: function() {
        return this.student;
      },
      setStudent: function(student) {
        this.student = student;
        $rootScope.$broadcast('student:changed', this.student);
        return;
      },
      getGoal: function() {
        return this.goal;
      },
      setGoal: function(goal) {
        this.goal = goal;
        $rootScope.$broadcast('goal:changed', this.goal);
        return;
      },
      fetchStudents: fetchStudents,
      fetchStudent: fetchStudent,
      createStudent: createStudent,
      updateStudent: updateStudent,
      deleteStudent: deleteStudent,
      createGoal: createGoal,
      updateGoal: updateGoal,
      deleteGoal: deleteGoal
    };

    function fetchStudents(teacherId, cb) {
      $http.get('/api/students')
        .then(function(response) {
          this.setStudents(response.data.students);
          handleCallback(cb, response, null);
        }.bind(this))
        .catch(function(rejection) {
          handleCallback(cb, null, rejection);
          return Errors.addError({
            'msg': 'There was an error fetching the students from the server. Please log out, refresh and try again. If it persists, please create a bug report so we can fix it.'
          });
        });
    }
    function fetchStudent(studentId, cb) {
      $http.get('/api/students/' + studentId)
        .then(function(response) {
          this.setStudent(response.data.student);
          handleCallback(cb, response, null);
        }.bind(this))
        .catch(function(rejection) {
          handleCallback(cb, null, rejection);
          return Errors.addError({
            'msg': 'There was an error fetching the student from the server. Please log out, refresh and try again. If it persists, please create a bug report so we can fix it.'
          });
        });

    }
    function createStudent(student, cb) {
      $http.post('/api/students', student)
        .then(function(response) {
          this.student = response.data.student;
          $rootScope.$broadcast('student:changed', this.student);
          handleCallback(cb, response, null);
        }.bind(this))
        .catch(function(rejection) {
          handleCallback(cb, null, rejection);
          return Errors.addError({
            'msg': 'There was an error create the student on the server. Please log out, refresh and try again. If it persists, please create a bug report so we can fix it.'
          });
        });

    }
    function updateStudent(student, cb) {
      $http.put('/api/students/' + student._id, student)
        .then(function(response) {
          this.student = response.data.student;
          $rootScope.$broadcast('student:changed', this.student);
          handleCallback(cb, response, null);
        }.bind(this))
        .catch(function(rejection) {
          handleCallback(cb, null, rejection);
          return Errors.addError({
            'msg': 'There was an error updating the student from the server. Please log out, refresh and try again. If it persists, please create a bug report so we can fix it.'
          });
        });

    }
    function deleteStudent(studentId, cb) {
      $http.delete('/api/students/' + studentId)
        .then(function(response) {
          this.student = null;
          $rootScope.$broadcast('student:changed', this.student);
          handleCallback(cb, response, null);
        }.bind(this))
        .catch(function(rejection) {
          handleCallback(cb, null, rejection);
          return Errors.addError({
            'msg': 'There was an error fetching the student from the server. Please log out, refresh and try again. If it persists, please create a bug report so we can fix it.'
          });
        });

    }

    function createGoal(studentId, goal, cb) {
      $http.post('/api/students/' + studentId + '/goals/', goal)
        .then(function(response) {
          this.student = response.data.student;
          $rootScope.$broadcast('student:changed', this.student);
          handleCallback(cb, response, null);
        }.bind(this))
        .catch(function(rejection) {
          handleCallback(cb, null, rejection);
          return Errors.addError({
            'msg': 'There was an error creating the goal on the server. Please log out, refresh and try again. If it persists, please create a bug report so we can fix it.'
          });
        });
    }
    function updateGoal(studentId, goal, cb) {
      $http.put('/api/students/' + studentId + '/goals/' + goal._id, goal)
        .then(function(response) {
          this.student = response.data.student;
          $rootScope.$broadcast('student:changed', this.student);
          handleCallback(cb, response, null);
        }.bind(this))
        .catch(function(rejection) {
          handleCallback(cb, null, rejection);
          return Errors.addError({
            'msg': 'There was an error updating the goal on the server. Please log out, refresh and try again. If it persists, please create a bug report so we can fix it.'
          });
        });
    }
    function deleteGoal(studentId, goalId, cb) {
      $http.delete('/api/students/' + studentId + '/goals/' + goalId)
        .then(function(response) {
          this.student = response.data.student;
          $rootScope.$broadcast('student:changed', this.student);
          handleCallback(cb, response, null);
        }.bind(this))
        .catch(function(rejection) {
          handleCallback(cb, null, rejection);
          return Errors.addError({
            'msg': 'There was an error deleting/archiving the goal on the server. Please log out, refresh and try again. If it persists, please create a bug report so we can fix it.'
          });
        });
    }
    function handleCallback(cb, response, rejection) {
      if (cb && typeof cb === 'function') {
        if (response) {
          return cb(null, response.data);
        }
        cb(rejection);
      }
    }
    return teacherStudentsData;
  };
}
