/**
 * A Controller for the Teachers List for an Admin
 * Created by Jonathan Ullberg on 11/23/2015
 */
'use strict';

export = function(app) {
  app.controller('AdminTeachersListCtrl', ['$scope', 'AdminData', function($scope, AdminData) {
    $scope.init = init;
    $scope.$on('teachers:changed', getTeachers);
    $scope.updateTeacher = updateTeacher;

    function init() {
      getTeachers();
    }
    function getTeachers() {
      if (!AdminData.Teachers.getTeachers()) {
        AdminData.Teachers.fetchTeachers();
      }
      $scope.teachers = AdminData.Teachers.getTeachers();
    }
    function updateTeacher(teacher) {
      AdminData.Teachers.updateTeacher(teacher);
    }
  ]);
};
