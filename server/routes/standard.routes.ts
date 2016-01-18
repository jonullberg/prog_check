/**
 * The routes for all CRUD actions for Standards and Goals on Standards
 * For use in the Prog Check Testing application
 * Created by Jonathan Ullberg on 10/28/2015
 */
'use strict';

var standardsController = require('./standards/controllers/standards_controller');
var bodyparser = require('body-parser');
var jwtAuth = require('../lib/jwt_auth')(process.env.APP_SECRET);

export = standardRouter;
function standardRouter(router) {
  router.use(bodyparser.json());

  // Gets all standards
  router.get('/standards', standardsController.getStandards);

  // Reads a specific standard
  router.get('/standards/:standardId', jwtAuth, standardsController.getStandardById);

  // Creates a new standard
  router.post('/standards', jwtAuth, standardsController.createNewStandard);

  // Creates a goal for a specific standard
  router.post('/standards/:standardId/goals', jwtAuth, standardsController.createNewGoal);

  // Updates a specific standard
  router.put('/standards/:standardId', jwtAuth, standardsController.updateStandardById);

  // Updates a specific goal on a standard
  router.put('/standards/:standardId/goals/:goalId', jwtAuth, standardsController.updateGoal);

  // Deletes a specific standard
  router.delete('/standards/:standardId', jwtAuth, standardsController.deleteStandardById);

  // Deletes a specific goal from a standard
  router.delete('/standards/:standardId/goals/:goalId', jwtAuth, standardsController.deleteGoalFromStandard);

};
