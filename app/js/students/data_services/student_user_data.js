/**
 * For use in the Prog Check testing application
 * A file to hold all student/user data for the logged in student
 * Created by Jonathan Ullberg on 10/23/2015
 */
'use strict';

module.exports = function(app) {
  app.factory('StudentUserData', ['$http', '$rootScope', 'RESTResource', function ($http, $rootScope, resource) {
    var Student = resource('student');
    var studentUserData = {
      student: $cookies.getObject('user'),
      getStudent: function() {

      }

    };
    return studentUserData;
  }])
}
