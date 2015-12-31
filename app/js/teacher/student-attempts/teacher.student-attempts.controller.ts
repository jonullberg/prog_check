/**
 * For use in the Prog Check testing application
 * A controller for dealing with displaying a single students most recent attempts
 * Created by Jonathan Ullberg on 10/23/2015
 */

module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .controller('StudentAttemptsCtrl', ['$scope', '$filter', '$routeParams', 'TeacherData', studentAttemptsCtrl])

  function studentAttemptsCtrl($scope, $filter, $routeParams, TeacherData) {


  }

}
