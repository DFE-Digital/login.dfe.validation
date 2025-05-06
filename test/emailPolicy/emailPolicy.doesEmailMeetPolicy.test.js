const emailPolicy = require("./../../src/emailPolicy");

describe("When checking if an email address meets the policy", () => {
  it("should return false when email is blank", () => {
    const email = "";
    const actual = emailPolicy.doesEmailMeetPolicy(email);
    expect(actual).toBe(false);
  });

  it("should return false when email is not a valid email address", () => {
    const email = "this-is-not-a-valid-email-address";
    const actual = emailPolicy.doesEmailMeetPolicy(email);
    expect(actual).toBe(false);
  });

  it("should return true if the email is valid", () => {
    const email = "f.price@floydprice.com";
    const actual = emailPolicy.doesEmailMeetPolicy(email);
    expect(actual).toBe(true);
  });
});
