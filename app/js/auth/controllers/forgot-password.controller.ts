/**
 * A controller for dealing with the reset password modal
 * Created by Jonathan Ullberg on 10/16/2015
 */
module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .controller('ForgotPasswordCtrl', ['$scope', '$uibModal', '$uibModalInstance', '$http', 'Errors', forgotPasswordCtrl])

  function forgotPasswordCtrl($scope, $uibModal, $uibModalInstance, $http, Errors) {
    $scope.submitForm = function() {
      $http.post('/api/forgot', $scope.resetPassword)
        .then(function(data) {
          $uibModalInstance.close();
          $uibModal.open({
            animation:true,
            size:'lg',
            templateUrl:'/templates/auth/forgot-thanks.html'
          });
        }, function(err) {
          return Errors.addError({
            'msg': 'There was an error on the server. Please try again in a bit. If the problem continues, please submit a bug report. Thank you for your patience.'
          });
        });
    };
  }
}
