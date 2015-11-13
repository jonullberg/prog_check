/**
 * For use in the Prog Check testing application
 * A controller for dealing with displaying a single students most recent attempts
 * Created by Jonathan Ullberg on 10/23/2015
 */
'use strict';

module.exports = function(app) {
  app.controller('StudentAttemptsCtrl', ['$scope', 'TeacherData', function ($scope, TeacherData) {
    $scope.init = init;
    $scope.$on('attempts:changed', getAttempts);
    function init() {
      getAttempts();
    }
    function getAttempts() {
      $scope.attempts = TeacherData.Attempts.getAttempts();
    }

  }]);
};
