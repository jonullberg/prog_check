'use strict';
var Standard = require('../../../models/Standard');
var getExampleQuestions = require('./get_example_questions');
var logError = require('../../../lib/log_error');
module.exports = {
    getStandards: getStandards,
    getStandardById: getStandardById,
    createNewStandard: createNewStandard,
    updateStandardById: updateStandardById,
    deleteStandardById: deleteStandardById,
    createNewGoal: createNewGoal,
    updateGoal: updateGoal,
    deleteGoalFromStandard: deleteGoalFromStandard
};
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
            var sentStandard = updatedStandard ?
                updatedStandard[0] :
                null;
            res.json({
                standard: sentStandard
            });
        }
    }
}
function createNewStandard(req, res) {
    var newStandard = new Standard(req.body);
    newStandard.save(saveStandard);
    function saveStandard(err, standard) {
        if (err) {
            logError(err, 500, 'Internal Server Error');
        }
        res.json({
            standard: standard
        });
    }
}
function updateStandardById(req, res) {
    var updatedStandard = req.body;
    delete updatedStandard._id;
    Standard.update({ _id: req.params.standardId }, updatedStandard, sendUpdateMessage);
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
    }, { $set: { 'goals.$': goal } }, sendUpdateMessage);
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
