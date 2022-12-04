// const express = require('express');
// const router = express.Router();
// const Joi = require('joi');
// const validateRequest = require('_middleware/validate-request');
// const authorize = require('_middleware/authorize')
// const listingService = require('./listing.service');

// // routes
// //router.post('/authenticate', authenticateSchema, authenticate);
// router.post('/register', registerSchema, register);
// router.get('/', authorize(), getAll);
// router.get('/public', getAll);
// router.get('/current', authorize(), getCurrent);
// router.get('/:id', authorize(), getById);
// router.put('/:id', authorize(), updateSchema, update);
// router.delete('/:id', authorize(), _delete);

// module.exports = router;

// // function authenticateSchema(req, res, next) {
// //     const schema = Joi.object({
// //         username: Joi.string().required(),
// //         password: Joi.string().required()
// //     });
// //     validateRequest(req, next, schema);
// // }

// // function authenticate(req, res, next) {
// //     listingService.authenticate(req.body)
// //         .then(user => res.json(user))
// //         .catch(next);
// // }

// function registerSchema(req, res, next) {
//     const schema = Joi.object({
//         unit_no: Joi.string().required(),
//         bedrooms: Joi.string().required(),
//         bathrooms: Joi.string().required(),
//         heating: Joi.string().required(),
//         air_condition: Joi.string().required(),
//         floor: Joi.string().required(),
//         address: Joi.string().required(),
//         monthly_rate: Joi.string().required(),
//         sq_footage: Joi.string().required(),
//         availability: Joi.string().required(),
//     });
//     validateRequest(req, next, schema);
// }

// function register(req, res, next) {
//     listingService.create(req.body)
//         .then(() => res.json({ message: 'Unit creation successful' }))
//         .catch(next);
// }

// function getAll(req, res, next) {
//     listingService.getAll()
//         .then(listings => res.json(listings))
//         .catch(next);
// }

// function getCurrent(req, res, next) {
//     res.json(req.listing);
// }

// function getById(req, res, next) {
//     listingService.getById(req.params.id)
//         .then(listing => res.json(listing))
//         .catch(next);
// }

// function updateSchema(req, res, next) {
//     const schema = Joi.object({
//         unit_no: Joi.string().empty(''),
//         bedrooms: Joi.string().empty(''),
//         bathrooms: Joi.string().empty(''),
//         heating: Joi.string().empty(''),
//         air_condition: Joi.string().empty(''),
//         floor: Joi.string().empty(''),
//         address: Joi.string().empty(''),
//         monthly_rate: Joi.string().empty(''),
//         sq_footage: Joi.string().empty(''),
//         availability: Joi.string().empty(''),
//     });
//     validateRequest(req, next, schema);
// }

// function update(req, res, next) {
//     listingService.update(req.params.id, req.body)
//         .then(listing => res.json(listing))
//         .catch(next);
// }

// function _delete(req, res, next) {
//     listingService.delete(req.params.id)
//         .then(() => res.json({ message: 'Unit deleted successfully' }))
//         .catch(next);
// }