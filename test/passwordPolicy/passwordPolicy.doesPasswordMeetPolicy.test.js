const passwordPolicy = require('../../src/passwordPolicy');

describe('When checking if a password meets the policy', () => {
  describe('and the password is a valid length of between 14 and 64 characters', () => {
    it('then it should return true if the password is 14 characters', () => {
      const actual = passwordPolicy.doesPasswordMeetPolicy('jumpSouthSpray');

      expect(actual).toBe(true);
    });
    it('then it should return true if the password is 14 characters long and includes numbers, uppercase letters, lowercase letters, symbols, and white spaces', () => {
      const actual = passwordPolicy.doesPasswordMeetPolicy('A a12^&tes=()s');

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
    it('then is should return false if the password is 13 characters', () => {
      const actual = passwordPolicy.doesPasswordMeetPolicy('abc123!ef4623');

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

describe('When checking if a password meets the new policy', () => {
  describe('and the password is a valid length of between 8 and 64 characters', () => {
    it('then it should return true if the password is 8 characters and valid', () => {
      const actual = passwordPolicy.doesPasswordMeetNewPolicy('12QWaszx');

      expect(actual).toBe(true);
    });

    it('then it should return true if the password is 64 characters', () => {
      const actual = passwordPolicy.doesPasswordMeetNewPolicy('12QWaszxnopqrstuvwxyz1234567890!@£$%^&*()012MskWas91K2!mao');

      expect(actual).toBe(true);
    });
  });

  describe('and the password is too short', () => {
    it('then is should return false if the password is 7 characters', () => {
      const actual = passwordPolicy.doesPasswordMeetNewPolicy('12QWasz');

      expect(actual).toBe(false);
    });

    it('then is should return false if the password does not have atleast 2 digits', () => {
      const actual = passwordPolicy.doesPasswordMeetNewPolicy('QWaszxqw');

      expect(actual).toBe(false);
    });

    it('then is should return false if the password does not have atleast 2 upper case chars', () => {
      const actual = passwordPolicy.doesPasswordMeetNewPolicy('12aszxqw');

      expect(actual).toBe(false);
    });

    it('then is should return false if the password does not have atleast 2 lower case chars', () => {
      const actual = passwordPolicy.doesPasswordMeetNewPolicy('12QWASZX');

      expect(actual).toBe(false);
    });

    it('then is should return false if the password is blank', () => {
      const actual = passwordPolicy.doesPasswordMeetNewPolicy('');

      expect(actual).toBe(false);
    });
    it('then is should return false if the password is null', () => {
      const actual = passwordPolicy.doesPasswordMeetNewPolicy(null);

      expect(actual).toBe(false);
    });
    it('then is should return false if the password is undefined', () => {
      const actual = passwordPolicy.doesPasswordMeetNewPolicy(undefined);

      expect(actual).toBe(false);
    });
  });
});

describe('Checking if password is in deny list', () => {
  it('should return false if password is not in the deny list', () => {
    const actual = passwordPolicy.isPasswordBlackListed('12DSaszx');
    expect(actual).toBe(false);
  });

  it('should return true if password is matching, disregarding case for alphabet characters', () => {
    const actual = passwordPolicy.isPasswordBlackListed('12QWaszx');
    expect(actual).toBe(true);
  });

  it('should return true if password is in deny list', () => {
    const actual = passwordPolicy.isPasswordBlackListed('1q2w3e4r5t6y7u8i9o0p');
    expect(actual).toBe(true);
  });
});
