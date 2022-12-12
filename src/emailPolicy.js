"use strict";

const emailValidator = require('email-validator');
const blacklistedEmails = require('../utils/blacklistedEmails');

const doesEmailMeetPolicy = (email) => {
  return emailValidator.validate(email)
};

const testBlacklisted = (email, emailBlacklisted) => {
  const fragments = emailBlacklisted.split('@');
  let re;

  if (fragments[0] === '') {
    re = new RegExp(`@${fragments[1]}$`);
  } else if (fragments[1] === '') {
    re = new RegExp(`^${fragments[0]}[.\\-_]?\\d*@`);
  } else {
    re = new RegExp(`^${fragments[0]}[.\\-_]?\\d*@${fragments[1]}$`);
  }

  return re.test(email);
}

const isBlacklistedEmail = (email) => blacklistedEmails.some((blacklisted) => testBlacklisted(email, blacklisted));

module.exports = {
  doesEmailMeetPolicy,
  isBlacklistedEmail,
};