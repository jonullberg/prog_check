/**
 * A service for dealing with stack traces in Angular app
 * For use in the Prog Check testing application
 * Created by Jonathan Ullberg on 12/02/2015
 */
'use strict';

export = function(app) {
  app.factory('stacktraceService', stacktraceService);
};

function stacktraceService() {
  return StackTrace;
}
