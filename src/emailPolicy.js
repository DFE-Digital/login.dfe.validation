"use strict";

const emailValidator = require('email-validator');

const doesEmailMeetPolicy = (email) => {
  return emailValidator.validate(email)
};

module.exports = {
  doesEmailMeetPolicy,
};