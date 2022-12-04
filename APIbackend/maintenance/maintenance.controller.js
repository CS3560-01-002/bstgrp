const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const maintenanceService = require('./maintenance.service');

// routes
//router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);
router.get('/jobs', authorize(), getAll);
router.get('/current', authorize(), getCurrent); //not implemented in the maintenance service (frontend) yet 
router.get('/jobs/:id', authorize(), getById);
router.put('/jobs/:id', authorize(), updateSchema, update);
router.delete('jobs/:id', authorize(), _delete);

module.exports = router;

// function authenticateSchema(req, res, next) {
//     const schema = Joi.object({
//         username: Joi.string().required(),
//         password: Joi.string().required()
//     });
//     validateRequest(req, next, schema);
// }

// function authenticate(req, res, next) {
//     listingService.authenticate(req.body)
//         .then(user => res.json(user))
//         .catch(next);
// }

function registerSchema(req, res, next) {
    const schema = Joi.object({
        user_id: Joi.string().required(),
        unit_no: Joi.string().required(),
        project_id: Joi.string().required(),
        description: Joi.string().required(),
        //primary_phone: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    maintenanceService.create(req.body)
        .then(() => res.json({ message: 'Issue creation successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    maintenanceService.getAll()
        .then(issues => res.json(issues))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.issue);
}

function getById(req, res, next) {
    maintenanceService.getById(req.params.id)
        .then(issue => res.json(issue))
        .catch(next);
}

function updateSchema(req, res, next) { //implement edit maintenance ticket later
    const schema = Joi.object({
        user_id: Joi.string().required(),
        unit_no: Joi.string().required(),
        project_id: Joi.string().required(),
        description: Joi.string().required(),
       // primary_phone: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    maintenanceService.update(req.params.id, req.body)
        .then(issue => res.json(issue))
        .catch(next);
}

function _delete(req, res, next) {
    maintenanceService.delete(req.params.id)
        .then(() => res.json({ message: 'Issue deleted successfully' }))
        .catch(next);
}