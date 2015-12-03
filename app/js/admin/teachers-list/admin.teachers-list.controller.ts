/**
 * A Controller for the Teachers List for an Admin
 * Created by Jonathan Ullberg on 11/23/2015
 */
'use strict';

export = function(app) {
  app.controller('AdminTeachersListCtrl', ['$scope', 'AdminData', adminTeachersListCtrl]);
};

function adminTeachersListCtrl($scope, AdminData) {
  $scope.$on('teachers:changed', getTeachers);
  
  // Public Functions
  $scope.init = function() {
    getTeachers();
  };

  $scope.updateTeacher = function(teacher) {
    AdminData.Teachers.updateTeacher(teacher);
  };

  // Private Functions
  function getTeachers() {
    if (!AdminData.Teachers.getTeachers()) {
      AdminData.Teachers.fetchTeachers();
    }
    $scope.teachers = AdminData.Teachers.getTeachers();
  }
}