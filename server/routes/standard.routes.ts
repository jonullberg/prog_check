/**
 * The routes for all CRUD actions for Standards and Goals on Standards
 * For use in the Prog Check Testing application
 * Created by Jonathan Ullberg on 10/28/2015
 */
'use strict';

var logError = require('../lib/log_error');
var Standard = require('../models/Standard');
var bodyparser = require('body-parser');
var jwtAuth = require('../lib/jwt_auth')(process.env.APP_SECRET);
var getExampleQuestions = require('./standards/controllers/get_example_questions');
export = standardRouter;
function standardRouter(router) {
  router.use(bodyparser.json());

  // Gets all standards
  router.get('/standards', getStandards);

  // Reads a specific standard
  router.get('/standards/:standardId', jwtAuth, getStandardById);

  // Creates a new standard
  router.post('/standards', jwtAuth, createNewStandard);

  // Creates a goal for a specific standard
  router.post('/standards/:standardId/goals', jwtAuth, createNewGoal);

  // Updates a specific standard
  router.put('/standards/:standardId', jwtAuth, updateStandardById);

  // Updates a specific goal on a standard
  router.put('/standards/:standardId/goals/:goalId', jwtAuth, updateGoal);

  // Deletes a specific standard
  router.delete('/standards/:standardId', jwtAuth, deleteStandardById);

  // Deletes a specific goal from a standard
  router.delete('/standards/:standardId/goals/:goalId', jwtAuth, deleteGoalFromStandard);

  function getStandards(req, res) {
    Standard.find({}).lean().exec(processStandards);
    function processStandards(err, standards) {
      if (err) {
        logError(err, 500, 'Internal Server Error');
      }
      getExampleQuestions(standards, sendStandards);
      function sendStandards(standards) {
        res.json({
          'standards': standards
        });
      }
    }
  }

  function getStandardById(req, res) {
    Standard.findById(req.params.standardId)
      .lean()
      .exec(processStandard);
    function processStandard(err, standard) {
      if (err) {
        logError(err, 500, 'Internal Server Error');
      }
      getExampleQuestions([standard], sendUpdatedStandard);
      function sendUpdatedStandard(updatedStandard) {
        res.json({
          standard: updatedStandard[0]
        });
      }
    }
  }

  function createNewStandard(req, res) {
    var newStandard = new Standard(req.body);
    newStandard.save(processStandard);
    function processStandard(err, standard) {
      if (err) {
        logError(err, 500, 'Internal Server Error');
      }
      getExampleQuestions([standard], sendUpdatedStandard);
      function sendUpdatedStandard(updatedStandard) {
        res.json({
          standard: updatedStandard[0]
        });
      }
    }
  }

  function updateStandardById(req, res) {
    var updatedStandard = req.body;
    delete updatedStandard._id;
    Standard.update({ _id: req.params.standardId },
      updatedStandard, sendUpdateMessage);
    function sendUpdateMessage(err) {
      if (err) {
        logError(err, 500, 'Internal Server Error');
      }
      res.json({
        'msg': 'Success'
      });
    }
  }

  function deleteStandardById(req, res) {
    Standard.remove({ '_id': req.params.standardId }, sendUpdateMessage);
    function sendUpdateMessage(err, data) {
      if (err) {
        logError(err, 500, 'Internal Server Error');
      }
      res.json({
        'msg': 'Success'
      });
    }
  }

  function createNewGoal(req, res) {
    var newGoal = req.body;
    Standard.findById(req.params.standardId, processStandard);
    function processStandard(err, standard) {
      if (err) {
        logError(err, 500, 'Internal Server Error');
      }
      if (standard.goals && Array.isArray(standard.goals)) {
        standard.goals.push(newGoal);
        standard.save(getGoalExampleQuestions);
      }
      function getGoalExampleQuestions(err, data) {
        if (err) {
          logError(err, 500, 'Internal Server Error');
        }
        getExampleQuestions([data], sendUpdatedStandard);
        function sendUpdatedStandard(updatedStandard) {
          res.json({
            standard: updatedStandard[0]
          });
        }
      }
    }
  }

  function updateGoal(req, res) {
    var goal = req.body;
    Standard.update({
      '_id': req.params.standardId,
      'goals._id': req.params.goalId
    },
      { $set: { 'goals.$': goal } }, sendUpdateMessage);

    function sendUpdateMessage(err, standard) {
      if (err) {
        logError(err, 500, 'Internal Server Error');
      }
      res.json({
        'msg': 'Success'
      });
    }
  }

  function deleteGoalFromStandard(req, res) {
    Standard.findById(req.params.standardId, processStandard);
    function processStandard(err, standard) {
      if (err) {
        logError(err, 500, 'Internal Server Error');
      }
      standard.goals = standard.goals.filter(filterGoalsByGoalId);
      function filterGoalsByGoalId(goal) {
        if (goal._id != req.params.goalId) {
          return goal;
        }
      }
      standard.save(getExampleQuestionsForStandard);
      function getExampleQuestionsForStandard(err, data) {
        if (err) {
          logError(err, 500, 'Internal Server Error');
        }
        getExampleQuestions([data], sendUpdatedStandard);
        function sendUpdatedStandard(updatedStandard) {
          res.json({
            standard: updatedStandard[0]
          });
        }
      }
    }
  }
};
