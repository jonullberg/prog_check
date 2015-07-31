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
        Students.create(student, function(err, data) {
          if (err) {
            callback(err);
          }
          this.student = data;
          this.students.push(this.student);
          $rootScope.$broadcast('student:changed');
          $rootScope.$broadcast('students:changed');
        }.bind(this));
      }
    };

    return studentData;
  }]);
};
