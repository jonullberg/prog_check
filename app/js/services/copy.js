(function() {
  'use strict';

  angular.module('progCheck')
  .factory('copy', copy)

  function copy() {
    return function(objToCopy) {
      var obj = {};
      Object.keys(objToCopy).forEach(function(key) {
        obj[key] = objToCopy[key];
      });
      return obj;
    };
  }
})();

