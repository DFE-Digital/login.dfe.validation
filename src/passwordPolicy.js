const blacklistedPasswords = require('../utils/blacklistedPasswords');

const doesPasswordMeetPolicy = (password) => {
  if (!password || !password.match(/^.{12,64}$/)) {
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
  } else if(!password.match(/(?=(.*\d){2})(?=(.*[a-z]){2})(?=(.*[A-Z]){2})/)) {
    return false;
  }

  return true;
};


const isPasswordBlackListed = password => blacklistedPasswords.some(bp => bp.toLowerCase() === password.toLowerCase());


module.exports = {
  doesPasswordMeetPolicy,
  doesPasswordMeetNewPolicy,
  isPasswordBlackListed,
};
