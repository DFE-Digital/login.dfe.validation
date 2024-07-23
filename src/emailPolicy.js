const emailValidator = require('email-validator');
const blacklistedEmails = require('../utils/blacklistedEmails');

const blacklistedEmailPatterns = blacklistedEmails
  .map((blackListedEmail) => {
    const fragments = blackListedEmail.split('@');
    if (fragments[0] === '') {
      return RegExp(`@${fragments[1]}$`, 'i');
    } else if (fragments[1] === '') {
      return RegExp(`^${fragments[0]}[.\\-_]?\\d*@`, 'i');
    } else {
      return RegExp(`^${fragments[0]}[.\\-_]?\\d*@${fragments[1]}$`, 'i');
    }
  });

const doesEmailMeetPolicy = (email) => emailValidator.validate(email);

const isBlacklistedEmail = (email) => blacklistedEmailPatterns.some(pattern => pattern.test(email));

module.exports = {
  doesEmailMeetPolicy,
  isBlacklistedEmail,
};
