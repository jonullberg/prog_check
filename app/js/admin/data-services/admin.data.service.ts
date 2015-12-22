/**
 * A factory for holding an Admin's different data stores that they need
 * Created by Jonathan Ullberg on 10/23/2015
 */

module ProgCheck {
  'use strict';

  angular
    .module('progCheck')
    .factory('AdminData', ['AuthenticationService', 'AdminStandardsData', 'AdminTestsData', 'AdminTeachersData', 'jwtHelper', adminData])

  function adminData(Auth, Standards, Tests, Teachers, jwtHelper) {
    return {
      Standards: Standards,
      Tests: Tests,
      Teachers: Teachers
    };

  }
}
