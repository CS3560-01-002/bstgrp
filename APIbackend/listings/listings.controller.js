const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const listingService = require('./listing.service');

// routes
//router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);
router.get('/', authorize(), getAll);
router.get('/current', authorize(), getCurrent);
router.get('/:id', authorize(), getById);
router.put('/:id', authorize(), updateSchema, update);
router.delete('/:id', authorize(), _delete);

module.exports = router;

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function authenticate(req, res, next) {
    listingService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        unitNo: Joi.string().required(),
        bedrooms: Joi.string().required(),
        bathrooms: Joi.string().required(),
        airCondition: Joi.string().required(),
        heating: Joi.string().required(),
        address: Joi.string().required(),
        cost: Joi.string().required(),
        availability: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    listingService.create(req.body)
        .then(() => res.json({ message: 'Listing creation successful' }))
        .catch(next);
}

function getAll(req, res, next) {
    listingService.getAll()
        .then(listings => res.json(listings))
        .catch(next);
}

function getCurrent(req, res, next) {
    res.json(req.listing);
}

function getById(req, res, next) {
    listingService.getById(req.params.id)
        .then(listing => res.json(listing))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        unitNo: Joi.string().required(),
        bedrooms: Joi.string().required(),
        bathrooms: Joi.string().required(),
        airCondition: Joi.string().required(),
        heating: Joi.string().required(),
        address: Joi.string().required(),
        cost: Joi.string().required(),
        availability: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    listingService.update(req.params.id, req.body)
        .then(listing => res.json(listing))
        .catch(next);
}

function _delete(req, res, next) {
    listingService.delete(req.params.id)
        .then(() => res.json({ message: 'Listing deleted successfully' }))
        .catch(next);
}