/**
 * Tests for the admin_teachers_list_controller.js file
 * Created by Jonathan Ullberg on 11/23/2015
 */
'use strict';

console.log = function() {};
require('../../../app/js/client.js');
require('angular-mocks');

describe('The Admin Teachers List Ctrl', function() {
  beforeEach(angular.mock.module('progCheck'));

  var scope;
  var $ControllerConstructor;

  var AdminTeachersListCtrl;
  var mockAdminData;

  var mockGetTeachers;
  var mockFetchTeachers;
  var mockUpdateTeacher;

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    $ControllerConstructor = $controller;

    mockGetTeachers = function() {
      return ['one', 'two', 'three'];
    };
    sinon.spy(mockGetTeachers);
    mockFetchTeachers = sinon.spy();
    mockUpdateTeacher = sinon.spy();

    mockAdminData = {
      Teachers: {
        getTeachers: mockGetTeachers,
        fetchTeachers: mockFetchTeachers,
        updateTeacher: mockUpdateTeacher
      }
    }

    AdminTeachersListCtrl = $ControllerConstructor('AdminTeachersListCtrl', {
      $scope: scope,
      AdminData: mockAdminData
    })
  }));
  it('should be a controller', function() {
    expect(typeof AdminTeachersListCtrl).to.equal('object');
  });
  describe('getTeachers()', function() {
    it('should call fetch teachers if getTeachers() responds with null', function() {
      scope.$broadcast('teachers:changed');
      expect(mockGetTeachers.called).to.equal(true);[]
    });
    it('should set $scope.teachers to whatever is returned by getTeachers()', function() {

    });
  });
});
