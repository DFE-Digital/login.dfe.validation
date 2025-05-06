"use strict";

const emailPolicy = require("../../src/emailPolicy");

describe("When checking if an email address is blacklisted", () => {
  it.each([
    "blacklisted.domain@hotmail.com",
    "office@gooddomain.com",
    "BlAcKlIsTeD.dOmAiN@HoTmAiL.CoM",
    "OfFiCe@GoOdDoMaIn.CoM",
    "BLACKLISTED.DOMAIN@HOTMAIL.COM",
    "OFFICE@GOODDOMAIN.COM",
    "school@",
    "school@GOODdomain.COM",
    "@me.com",
    "bad.nAmE@me.com",
  ])('should return true when email "%s" is blacklisted.', (email) => {
    const domainResult = emailPolicy.isBlacklistedEmail(email);

    expect(domainResult).toBe(true);
  });

  it.each([
    "real.name@gooddomain.com",
    "ReAl.NaMe@GoOdDoMaIn.CoM",
    "REAL.NAME@GOODDOMAIN.COM",
    "joe.whitehead@gooddomain.com",
  ])('should return false when email "%s" is not blacklisted.', (email) => {
    const domainResult = emailPolicy.isBlacklistedEmail(email);

    expect(domainResult).toBe(false);
  });
});
