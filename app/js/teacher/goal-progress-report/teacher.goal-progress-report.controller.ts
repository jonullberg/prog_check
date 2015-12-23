/**
 * A Controller for the Progress Report for Teachers viewing a student's goal
 * For use in the Prog Check testing application
 * Created by Jonathan Ullberg on 12/15/2015
 */

module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .controller('ProgressReportCtrl', ['$scope', '$routeParams', 'TeacherData', progressReportCtrl])
  function progressReportCtrl($scope, $routeParams, TeacherData) {
    var pr = this;

    // Public Functions
    pr.init = function() {
      getStudent();
    };

    // Private Functions
    function getStudent() {
      pr.student = TeacherData.Students.getStudent();
    }
  }
}
