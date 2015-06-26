'use strict';

module.exports = function(app) {
  app.directive('pcShowTeachers', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/directives/teachers.html'
    };
  });
};
