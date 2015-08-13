'use strict';

module.exports = function(app) {
  app.factory('Student', ['$rootScope', '$cookies', 'RESTResource', function($rootScope, $cookies, resource) {
    var Student = resource('student');
    var studentData = {
      student: function() {
        return $cookies.getObject('user');
      }
    };
    return studentData;
  }]);
};
