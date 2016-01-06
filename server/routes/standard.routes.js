'use strict';
var standardsController = require('./standards/controllers/standards_controller');
var bodyparser = require('body-parser');
var jwtAuth = require('../lib/jwt_auth')(process.env.APP_SECRET);
function standardRouter(router) {
    router.use(bodyparser.json());
    router.get('/standards', standardsController.getStandards);
    router.get('/standards/:standardId', jwtAuth, standardsController.getStandardById);
    router.post('/standards', jwtAuth, standardsController.createNewStandard);
    router.post('/standards/:standardId/goals', jwtAuth, standardsController.createNewGoal);
    router.put('/standards/:standardId', jwtAuth, standardsController.updateStandardById);
    router.put('/standards/:standardId/goals/:goalId', jwtAuth, standardsController.updateGoal);
    router.delete('/standards/:standardId', jwtAuth, standardsController.deleteStandardById);
    router.delete('/standards/:standardId/goals/:goalId', jwtAuth, standardsController.deleteGoalFromStandard);
}
;
module.exports = standardRouter;
