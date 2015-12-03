/**
 * A service for passing errors to the Angular $log service
 * Then we handle our own error handling in the application
 * For use in the Prog Check testing application
 * Created by Jonathan Ullberg on 12/02/2015
 */
'use strict';

export = function(app) {
  app.factory('errorLogService', ['$injector', '$log', '$window', errorLogService]);
}

function errorLogService($injector, $log, $window) {
  return function($delegate) {
    return function(exception, cause) {

      var $http = $injector.get('$http');
      /**
       * Pass off the error to the default error handler
       * on the AngularJS logger. This will output the
       * error to the console (and let the application
       * keep running normally for the user).
       * @param {[type]} $log      The native Angular log service
       * @param {[type]} arguments [description]
       */
      // $log.error.apply($log, arguments);

      try {
        var errorMessage = exception.toString();
        StackTrace
          .fromError(exception)
          .then(function(stackframes) {
            var stringifiedStack = stackframes.map(function(sf) {
              return sf.toString();
            }).join('\n');
            $http.post('/api/client-log', {
              source: 'client',
              errorUrl: $window.location.href,
              errorMessage: errorMessage,
              stackTrace: stringifiedStack,
              cause: (cause || '')
            })
              .then(function(response) {

              })
              .catch(function(rejection) {
              });
          });
      } catch (loggingError) {
        $log.warn('Error logging failed');
        $log.log(loggingError);
      }
      $delegate(exception, cause);
    }
  };
}
