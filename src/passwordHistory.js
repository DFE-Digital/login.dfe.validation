const crypto = require('crypto');
/**
 * A Utility class to make 
 * @param {Array[]}  historyList  past passowrds array
 * @param {string}      newPass  the new password to check 
 * @param {string}      userPasswordPolicyCode  the interaction to use 
 * @returns {boolean}   when validate is called it will send true for valid no past history found 
 * and false when a match has been found
 */
class PasswordHistory {
  constructor(historyList, newPassword, userPasswordPolicyCode) { 
    this.passwordhistory = historyList;
    this.newPass = newPassword;
    this.userPasswordPolicyCode = userPasswordPolicyCode;
  }

  validate() {
    let iterations = 1;
    if (this.userPasswordPolicyCode === 'v3') {
      iterations = 120000;
    } else {
      iterations = 10000;
    }
    const result = [];
   this.passwordhistory.forEach((element) => {
      const resultkey = crypto.pbkdf2Sync(this.newPass, element.salt, iterations, 512, 'sha512');
      const passwordValid = resultkey.toString('base64') === element.password;
      result.push(passwordValid);
    });
    const matched = result.filter((d) => d === true);
    if (matched.length > 0) {
      return false;
    }
    return true;
  }
}

module.exports = PasswordHistory;
