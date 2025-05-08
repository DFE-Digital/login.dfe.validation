const dfeBlacklistedPasswords = require("../utils/blacklistedPasswords");
const ncscBlacklistedPasswords = require("../utils/PwnedPasswordsTop100k.json");

const doesPasswordMeetNewPolicy = (password) => /^.{14,64}$/.test(password);

const isPasswordBlackListed = (password) => {
  const blacklistedPasswordList = [
    ...dfeBlacklistedPasswords,
    ...ncscBlacklistedPasswords,
  ];
  return blacklistedPasswordList.some(
    (bp) => bp.toLowerCase() === password.toLowerCase(),
  );
};

module.exports = {
  doesPasswordMeetNewPolicy,
  isPasswordBlackListed,
};
