const passwordPolicy = require('./passwordPolicy');
const emailPolicy = require('./emailPolicy');
const {validate,testValidatorArray} = require('./validators');
module.exports = {
  passwordPolicy,
  emailPolicy,
  validate,
  testValidatorArray,
};
