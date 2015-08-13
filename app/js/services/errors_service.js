'use strict';

module.exports = function(app) {
  app.factory('Errors', ['$rootScope', function ($rootScope) {


    return {
      errors: [],
      addError: function(error) {
        this.errors.push(error);
        $rootScope.$broadcast('errors:changed');
        console.log('added error ' + error);
      },
      removeError: function(error) {
        this.errors.splice(this.errors.indexOf(error), 1);
      }
    };
  }]);
};
