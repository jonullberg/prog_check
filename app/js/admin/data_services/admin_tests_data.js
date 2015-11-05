/**
 * A module for holding all tests for the admin
 * Created by Jonathan Ullberg on 10/23/2015
 */
'use strict';

module.exports = function(app) {
  app.factory('AdminTestsData', ['$http', '$rootScope', 'Errors', function ($http, $rootScope, Errors) {

    var adminTestsData = {
      tests: [],
      test: null,
      getTests: function() {},
      setTests: function() {}
    };
    return adminTestsData;
  }]);
};
