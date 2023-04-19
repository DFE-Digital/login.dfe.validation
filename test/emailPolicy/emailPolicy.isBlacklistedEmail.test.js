'use strict';

const emailPolicy = require('../../src/emailPolicy');

describe('When checking if an email address is blacklisted', () => {
  it('should return true if email domain is blacklisted (lowercase)', () => {
    const domainTest = 'blacklisted.domain@hotmail.com';
    const domainResult = emailPolicy.isBlacklistedEmail(domainTest);

    expect(domainResult).toBe(true);
  });

  it('should return true if email username is blacklisted (lowercase)', () => {
    const usernameTest = 'office@gooddomain.com';
    const usernameResult = emailPolicy.isBlacklistedEmail(usernameTest);

    expect(usernameResult).toBe(true);
  });

  it('should return false if the email address is not blacklisted (lowercase)', () => {
    const emailTest = 'real.name@gooddomain.com';
    const emailResult = emailPolicy.isBlacklistedEmail(emailTest);

    expect(emailResult).toBe(false);
  });

  it('should return true if email domain is blacklisted (mixed-case)', () => {
    const domainTest = 'BlAcKlIsTeD.dOmAiN@HoTmAiL.CoM';
    const domainResult = emailPolicy.isBlacklistedEmail(domainTest);

    expect(domainResult).toBe(true);
  });

  it('should return true if email username is blacklisted (mixed-case)', () => {
    const usernameTest = 'OfFiCe@GoOdDoMaIn.CoM';
    const usernameResult = emailPolicy.isBlacklistedEmail(usernameTest);

    expect(usernameResult).toBe(true);
  });

  it('should return false if the email address is not blacklisted (mixed-case)', () => {
    const emailTest = 'ReAl.NaMe@GoOdDoMaIn.CoM';
    const emailResult = emailPolicy.isBlacklistedEmail(emailTest);

    expect(emailResult).toBe(false);
  });

  it('should return true if email domain is blacklisted (uppercase)', () => {
    const domainTest = 'BLACKLISTED.DOMAIN@HOTMAIL.COM';
    const domainResult = emailPolicy.isBlacklistedEmail(domainTest);

    expect(domainResult).toBe(true);
  });

  it('should return true if email username is blacklisted (uppercase)', () => {
    const usernameTest = 'OFFICE@GOODDOMAIN.COM';
    const usernameResult = emailPolicy.isBlacklistedEmail(usernameTest);

    expect(usernameResult).toBe(true);
  });

  it('should return false if the email address is not blacklisted (uppercase)', () => {
    const emailTest = 'REAL.NAME@GOODDOMAIN.COM';
    const emailResult = emailPolicy.isBlacklistedEmail(emailTest);

    expect(emailResult).toBe(false);
  });
});
