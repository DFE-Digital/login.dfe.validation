"use strict";

var doesPasswordMeetPolicy = function doesPasswordMeetPolicy(password) {
  if (!password || !password.match(/^.{12,64}$/)) {
    return false;
  }

  return true;
};

module.exports = {
  doesPasswordMeetPolicy: doesPasswordMeetPolicy
};