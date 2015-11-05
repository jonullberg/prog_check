'use strict';

module.exports = function(app) {
  app.factory('TeacherStudentsData', ['$http', '$rootScope', 'RESTResource', function($http, $rootScope, resource) {
    var Students = resource('students');
    var Attempts = resource('attempts');

    var studentData = {
      student: null,
      students: [],
      getStudents: function(callback) {
        var that = this;
        $http.get('/api/students')
          .then(function(response) {
            if (response.data && response.data.students && response.data.students.length) {
              var students = response.data.students;
              that.students = students;
              $rootScope.$broadcast('students:changed', students);
              if (callback && typeof callback === 'function') {
                callback(null, response.data);
              }
            }
          })
          .catch(function(rejection) {

          });
        Students.getAll(function(err, data) {
          if (err) {
            return callback(err);
          }
          this.students = data;
          $rootScope.$broadcast('students:changed');
          callback(err, data);
        }.bind(this));
      },
      getStudent: function(id, callback) {
        Students.getOne(id, function(err, data) {
          if (err) {
            callback(err);
          }
          callback(err, data);
        }.bind(this));
      },
      setStudent: function(student) {
        this.student = student;
        $rootScope.$broadcast('student:changed');
      },
      createStudent: function(student, callback) {
        this.student = student;
        this.students.push(student);
        Students.create(student, function(err, data) {
          if (err) {
            callback(err);
          }
          this.student = data;
          this.students.splice(this.students.indexOf(data), 1, data);
          callback(err, data);
        }.bind(this));
      },
      saveStudent: function(student, callback) {
        Students.save(student, function(err, data) {
          if (err) {
            callback(err);
          }
          callback(err, data);
        }.bind(this));
      },
      deleteStudent: function(student, callback) {
        Students.remove(student, function(err, data) {
          if (err) {
            return callback(err);
          }

          return callback(err, data);
        });
      },
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

    return studentData;
  }]);
};