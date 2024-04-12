const dfeBlacklistedPasswords = require('../utils/blacklistedPasswords');
const ncscBlacklistedPasswords = require('../utils/PwnedPasswordsTop100k.json');

const doesPasswordMeetNewPolicy = (password) => {
  if (!password || !password.match(/^.{14,64}$/)) {
    return false;
  }
  return true;
};

const isPasswordBlackListed = (password) => {
  const blacklistedPasswordList = [...dfeBlacklistedPasswords, ...ncscBlacklistedPasswords];
  return blacklistedPasswordList.some((bp) => bp.toLowerCase() === password.toLowerCase());
};

module.exports = {
  doesPasswordMeetNewPolicy,
  isPasswordBlackListed,
};
