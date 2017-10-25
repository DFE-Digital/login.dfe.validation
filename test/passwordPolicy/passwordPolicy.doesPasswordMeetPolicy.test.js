const passwordPolicy = require('./../../src/passwordPolicy');

describe('When checking if a password meets the policy', () => {
  describe('and the password is a valid length of between 12 and 64 characters', () => {
    it('then it should return true if the password is 12 characters', () => {
      const actual = passwordPolicy.doesPasswordMeetPolicy('abc123!ef46@');

      expect(actual).toBe(true);
    });
    it('then it should return true if the password is 20 characters', () => {
      const actual = passwordPolicy.doesPasswordMeetPolicy('abcdefghijklm!*12365');

      expect(actual).toBe(true);
    });
    it('then it should return true if the password is 64 characters', () => {
      const actual = passwordPolicy.doesPasswordMeetPolicy('abcdefghijklmnopqrstuvwxyz1234567890!@£$%^&*()012MskWas91K2!mao');

      expect(actual).toBe(true);
    });
  });

  describe('and the password is too short', () => {
    it('then is should return false if the password is 11 characters', () => {
      const actual = passwordPolicy.doesPasswordMeetPolicy('abc123!ef46');

      expect(actual).toBe(false);
    });
    it('then is should return false if the password is 6 characters', () => {
      const actual = passwordPolicy.doesPasswordMeetPolicy('abc123!ef46');

      expect(actual).toBe(false);
    });
    it('then is should return false if the password is blank', () => {
      const actual = passwordPolicy.doesPasswordMeetPolicy('');

      expect(actual).toBe(false);
    });
    it('then is should return false if the password is null', () => {
      const actual = passwordPolicy.doesPasswordMeetPolicy(null);

      expect(actual).toBe(false);
    });
    it('then is should return false if the password is undefined', () => {
      const actual = passwordPolicy.doesPasswordMeetPolicy(undefined);

      expect(actual).toBe(false);
    });
  });

  describe('and the password is too long', () => {
    it('then is should return false if the password is 65 characters', () => {
      const actual = passwordPolicy.doesPasswordMeetPolicy('abcdefghijklmnopqrstuvwxyz1234567890!@£$%^&*()012MskWas91K2!maoef461');

      expect(actual).toBe(false);
    });
  });
});


