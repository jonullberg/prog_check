'use strict';

module.exports = function(app) {
  app.factory('Students', ['$rootScope', 'RESTResource', function($rootScope, resource) {

    var Students = resource('students');
    var studentData = {
      student: null,
      students: [],
      getStudents: function(callback) {
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
          this.student = data;
          $rootScope.$broadcast('student:changed');
          callback(err, data);
        }.bind(this));
      },
      setStudent: function(student) {
        this.student = student;
        $rootScope.$broadcast('student:changed');
      },
      addStudent: function(student, callback) {
        this.student = student;
        this.students.push(student)
        Students.create(student, function(err, data) {
          if (err) {
            callback(err);
          }
          this.student = data;
          this.students.splice(this.students.indexOf(data), 1, data);
          $rootScope.$broadcast('students:changed');
          $rootScope.$broadcast('student:changed');
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
      addGoal: function(goal, callback) {
        this.student.goals.push(goal);
        this.students.splice(this.students.indexOf(this.student), 1, this.student);
        $rootScope.$broadcast('student:changed');
        $rootScope.$broadcast('students:changed');
        Students.save(this.student, function(err) {
          if (err) {
            callback(err);
          }
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
