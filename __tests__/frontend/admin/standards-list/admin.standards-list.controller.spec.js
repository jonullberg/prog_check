/**
 * Unit tests for the Admin Standards-List Controller
 */
'use strict'

require('../../../../app/js/client')
require('angular-mocks')

describe('The Admin Standards-list controller', function(){
  beforeEach(angular.mock.module('progCheck'))
  var AdminStandardsListCtrl
  var scope
  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    scope = $rootScope.$new()
    $controller('StandardsListCtrl as sl', {$scope: scope})
  }))
  describe('init method', function() {
    it('should be a function called init', function() {
      var actual = typeof scope.sl.init
      var expected = 'function'
      expect(actual).toBe(expected)
    })
    it('should call getStandards', function() {})
  })
  it('should have dataLoaded variable set to false', function() {
    var actual = scope.sl.dataLoaded
    var expected = false
    expect(actual).toBe(expected)
  })
})
