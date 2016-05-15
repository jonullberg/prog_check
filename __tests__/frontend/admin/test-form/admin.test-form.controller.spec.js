/** Unit test */
'use strict'

require('../../../../app/js/client')
require('angular-mocks')

describe('The AdminTestFormCtrl', function() {
  beforeEach(angular.mock.module('progCheck'))
  var AdminTestFormCtrl;
  var scope;
  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    scope = $rootScope.$new()
    $controller('TestFormCtrl as tf' {$scope: scope})
  }))
  describe('init method', function() {

  })
  describe('the getTest')
})
