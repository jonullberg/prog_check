'use strict';
function stacktraceService() {
    return StackTrace;
}
module.exports = function (app) {
    app.factory('stacktraceService', stacktraceService);
};
