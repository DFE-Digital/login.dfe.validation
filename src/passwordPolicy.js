const dfeBlacklistedPasswords = require('../utils/blacklistedPasswords');
const ncscBlacklistedPasswords = require('../utils/PwnedPasswordsTop100k.json');

const doesPasswordMeetPolicy = (password) => {
  if (!password || !password.match(/^.{14,64}$/)) {
    return false;
  }
  return true;
};

const doesPasswordMeetNewPolicy = (password) => {
  /*
   (?=(.*\d){2}) --> atleast 2 digits
   (?=(.*[a-z]){2}) --> atleast 2 lower case chars
   (?=(.*[A-Z]){2}) --> atleast 2 upper case chars
  */

  if (!password || !password.match(/^.{8,64}$/)) {
    return false;
  } if (!password.match(/(?=(.*\d){2})(?=(.*[a-z]){2})(?=(.*[A-Z]){2})/)) {
    return false;
  }

  return true;
};

const isPasswordBlackListed = (password) => {
  const blacklistedPasswordList = [...dfeBlacklistedPasswords, ...ncscBlacklistedPasswords];
  return blacklistedPasswordList.some((bp) => bp.toLowerCase() === password.toLowerCase());
};

module.exports = {
  doesPasswordMeetPolicy,
  doesPasswordMeetNewPolicy,
  isPasswordBlackListed,
};
