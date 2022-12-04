const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("_middleware/validate-request");
const authorize = require("_middleware/authorize");
const applicationService = require("./application.service");

// routes
//router.post('/authenticate', authenticateSchema, authenticate);
router.post("/register", registerSchema, register);
// router.get("/", authorize(), getAll);
// router.get("/current", authorize(), getCurrent);
// router.get("/:id", authorize(), getById);
// router.put("/:id", authorize(), updateSchema, update);
// router.delete("/:id", authorize(), _delete);

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
    credit_score: Joi.string().required(),
    income: Joi.string().required(),
    unit_id: Joi.string().required(),
    employer: Joi.string().required(),
    house_mate_count: Joi.string().required(),
    vehicle: Joi.string().required(),
    applicant_id: Joi.string().required(),
  });
  validateRequest(req, next, schema);
}

function register(req, res, next) {
  applicationService
    .create(req.body)
    .then(() => res.json({ message: "Application creation successful" }))
    .catch(next);
}

// function updateSchema(req, res, next) {
//   const schema = Joi.object({
//     unit_no: Joi.string().empty(""),
//     bedrooms: Joi.string().empty(""),
//     bathrooms: Joi.string().empty(""),
//     heating: Joi.string().empty(""),
//     air_condition: Joi.string().empty(""),
//     floor: Joi.string().empty(""),
//     address: Joi.string().empty(""),
//     monthly_rate: Joi.string().empty(""),
//     sq_footage: Joi.string().empty(""),
//     availability: Joi.string().empty(""),
//   });
//   validateRequest(req, next, schema);
// }

// function update(req, res, next) {
//   listingService
//     .update(req.params.id, req.body)
//     .then((listing) => res.json(listing))
//     .catch(next);
// }

// function _delete(req, res, next) {
//   listingService
//     .delete(req.params.id)
//     .then(() => res.json({ message: "Unit deleted successfully" }))
//     .catch(next);
// }
