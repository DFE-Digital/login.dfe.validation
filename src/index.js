const passwordPolicy = require("./passwordPolicy");
const emailPolicy = require("./emailPolicy");
const urlValidator = require("./urlValidator");
const { validate, testValidatorArray } = require("./validators");
module.exports = {
  passwordPolicy,
  emailPolicy,
  validate,
  testValidatorArray,
  urlValidator,
};
