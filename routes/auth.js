const express = require("express");
const router = express.Router();
// const { Founder, validateFounder } = require('../models/founder');
const { Business, validateBusiness } = require("../models/business");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");
var ObjectId = require("mongoose").Types.ObjectId;

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(404).send(error.details[0].message);
  let business = await Business.findOne({ businessEmail: req.body.email });
  if (!business) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(
    req.body.password,
    business.password
  );
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  // if (!(req.body.password === business.password)) return res.status(400).send('Invalid email or password.');

  const token = business.generateAuthToken();
  res.send(token);
});

function validate(req) {
  return Joi.validate(req, {
    email: Joi.string().min(5).required().email(),
    password: Joi.string().min(8).max(255).required(),
  });
}

module.exports = router;
