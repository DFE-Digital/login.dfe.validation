'use strict';

const emailPolicy = require('../../src/emailPolicy');

describe('When checking if an email address meets the policy', () => {
  it('should return true if email is blacklisted', () => {
    const email = 'blacklisted.domain@hotmail.com';
    const actual = emailPolicy.isBlacklistedEmail(email);
    expect(actual).toBe(true);
  });

  it('should return false if the email is not blacklisted', () => {
    const email = 'real.name@gooddomain.com';
    const actual = emailPolicy.isBlacklistedEmail(email);
    expect(actual).toBe(false);
  });
});
