'use strict';

module.exports = function(app) {
  app.factory('TeacherStudentsData', ['$http', '$rootScope', 'Errors', function($http, $rootScope, Errors) {

    var teacherStudentsData = {
      student: null,
      students: null,
      goal: null,
      getStudents: function() {
        return this.students;
      },
      setStudents: function(students) {
        this.students = students;
        $rootScope.$broadcast('students:change', this.students);
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
          this.students = response.data.students;
          $rootScope.$broadcast('students:changed', this.students);
          handleCallback(cb, response);
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
          this.student = response.data.student;
          $rootScope.$broadcast('student:changed', this.student);
          handleCallback(cb, response);
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
          handleCallback(cb, response);
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
          handleCallback(cb, response);
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
          handleCallback(cb, response);
        }.bind(this))
        .catch(function(rejection) {
          handleCallback(cb, null, rejection);
          return Errors.addError({
            'msg': 'There was an error fetching the student from the server. Please log out, refresh and try again. If it persists, please create a bug report so we can fix it.'
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
    function createGoal(studentId, goal, cb) {
      $http.post('/api/students/' + studentId + '/goals/', goal)
        .then(function(response) {
          this.student = response.data.student;
          $rootScope.$broadcast('student:changed', this.student);
          handleCallback(cb, response);
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
          handleCallback(cb, response);
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
          handleCallback(cb, response);
        }.bind(this))
        .catch(function(rejection) {
          handleCallback(cb, null, rejection);
          return Errors.addError({
            'msg': 'There was an error deleting/archiving the goal on the server. Please log out, refresh and try again. If it persists, please create a bug report so we can fix it.'
          });
        });
    }
    return teacherStudentsData;
  }]);
};
var used = {
  createGoal: function(goal, studentId, callback) {
    var submitted = {
      numberOfQuestions: goal.numberOfQuestions,
      goalId: goal._id,
      priority:null,

    };
    $http.post('/api/students/' + studentId + '/goals/', submitted)
      .then(function(response) {
        var student = response.data.user;
        this.student = student;
        $rootScope.$broadcast('student:changed', student);
        callback(null, student);

      }.bind(this))
      .catch(function(response) {
        callback(response.data)
      });
  },
  updateGoal: function(goal, studentId, callback) {
    $http.put('/api/students/' + studentId + '/goals/' + goal._id, submitted)
      .then(function(response) {
        callback(null, response.data);
      })
      .catch(function(rejection) {
        callback(rejection.data);
      });
  },
  removeGoal: function(goal, callback) {
    this.student.goals.splice(this.student.goals.indexOf(goal), 1);
    this.students.splice(this.students.indexOf(this.student), 1, this.student);
    Students.save(this.student, function(err) {
      if (err) {
        callback(err);
      }
    });
  }
};
