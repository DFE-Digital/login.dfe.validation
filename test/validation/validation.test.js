const { body } = require("express-validator");
const { validate } = require("../../src");

describe("validation library", () => {
  it("validate - should call next if no errors", async () => {
    let validators = [body("id").isUUID().withMessage("expected a UUID")];
    //Initial Request
    let req = {
      body: {
        id: "eadf9beb-1659-47e0-8726-a93498c3e389",
      },
    };

    //Fake running the validators
    await Promise.all(
      validators.map(async (v) => {
        await v(req, {}, () => {});
      }),
    );

    //Create a fake request
    let jsonFn = jest.fn();
    let res = {
      status: jest.fn().mockImplementation((statusCode) => ({ json: jsonFn })),
    };
    let next = jest.fn();

    validate()(req, res, next);
    expect(next).toHaveBeenCalled();
  });
  it("validate - should return status 400 and verbose error json if invalid", async () => {
    let validators = [body("id").isUUID().withMessage("expected a UUID")];
    //Initial Request
    let req = {
      body: {
        id: "not-a-uuid",
      },
    };

    //Fake running the validators
    await Promise.all(
      validators.map(async (v) => {
        await v(req, {}, () => {});
      }),
    );

    //Create a fake request
    let jsonFn = jest.fn();
    let res = {
      status: jest.fn().mockImplementation((statusCode) => ({ json: jsonFn })),
    };
    let next = jest.fn();

    validate()(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(jsonFn).toHaveBeenCalledWith({
      reasons: [
        {
          name: "id",
          message: "expected a UUID",
        },
      ],
    });
  });
  it("validate - should return status 400 and non verbose error if verbose = false option passed", async () => {
    let validators = [body("id").isUUID().withMessage("expected a UUID")];
    //Initial Request
    let req = {
      body: {
        id: "not-a-uuid",
      },
    };

    //Fake running the validators
    await Promise.all(
      validators.map(async (v) => {
        await v(req, {}, () => {});
      }),
    );

    //Create a fake request
    let jsonFn = jest.fn();
    let res = {
      status: jest.fn().mockImplementation((statusCode) => ({ json: jsonFn })),
    };
    let next = jest.fn();

    validate({ verbose: false })(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(jsonFn).toHaveBeenCalledWith({
      reasons: [
        {
          name: "error",
          message: "A validation error occurred",
        },
      ],
    });
  });
  it("validate - should return status 400 and custom response name", async () => {
    let validators = [body("id").isUUID().withMessage("expected a UUID")];
    //Initial Request
    let req = {
      body: {
        id: "not-a-uuid",
      },
    };

    //Fake running the validators
    await Promise.all(
      validators.map(async (v) => {
        await v(req, {}, () => {});
      }),
    );

    //Create a fake request
    let jsonFn = jest.fn();
    let res = {
      status: jest.fn().mockImplementation((statusCode) => ({ json: jsonFn })),
    };
    let next = jest.fn();

    validate({ responseName: "errors" })(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(jsonFn).toHaveBeenCalledWith({
      errors: [
        {
          name: "id",
          message: "expected a UUID",
        },
      ],
    });
  });
  it("validate - should return status 400 and new response format if legacy true is passed", async () => {
    let validators = [body("id").isUUID().withMessage("expected a UUID")];
    //Initial Request
    let req = {
      body: {
        id: "not-a-uuid",
      },
    };

    //Fake running the validators
    await Promise.all(
      validators.map(async (v) => {
        await v(req, {}, () => {});
      }),
    );

    //Create a fake request
    let jsonFn = jest.fn();
    let res = {
      status: jest.fn().mockImplementation((statusCode) => ({ json: jsonFn })),
    };
    let next = jest.fn();

    validate({ legacy: true })(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(jsonFn).toHaveBeenCalledWith({
      reasons: ["id expected a UUID"],
    });
  });
  it("validate - should call callback with errors if provided", async () => {
    let validators = [body("id").isUUID().withMessage("expected a UUID")];
    //Initial Request
    let req = {
      body: {
        id: "not-a-uuid",
      },
    };

    //Fake running the validators
    await Promise.all(
      validators.map(async (v) => {
        await v(req, {}, () => {});
      }),
    );

    //Create a fake request
    let jsonFn = jest.fn();
    let res = {
      status: jest.fn().mockImplementation((statusCode) => ({ json: jsonFn })),
    };
    let next = jest.fn();
    let callback = jest.fn();

    validate({ loggerCb: callback })(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(jsonFn).toHaveBeenCalledWith({
      reasons: [
        {
          name: "id",
          message: "expected a UUID",
        },
      ],
    });
    expect(callback).toHaveBeenCalledWith(
      '{"validationErrors":[{"name":"id","message":"expected a UUID"}],"body":null}',
    );
  });
  it("validate - should call callback with errors and body if cb provided with loggerIncludeBody", async () => {
    let validators = [body("id").isUUID().withMessage("expected a UUID")];
    //Initial Request
    let req = {
      body: {
        id: "not-a-uuid",
      },
    };

    //Fake running the validators
    await Promise.all(
      validators.map(async (v) => {
        await v(req, {}, () => {});
      }),
    );

    //Create a fake request
    let jsonFn = jest.fn();
    let res = {
      status: jest.fn().mockImplementation((statusCode) => ({ json: jsonFn })),
    };
    let next = jest.fn();
    let callback = jest.fn();

    validate({ loggerCb: callback, loggerIncludeBody: true })(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(jsonFn).toHaveBeenCalledWith({
      reasons: [
        {
          name: "id",
          message: "expected a UUID",
        },
      ],
    });
    expect(callback).toHaveBeenCalledWith(
      '{"validationErrors":[{"name":"id","message":"expected a UUID"}],"body":{"id":"not-a-uuid"}}',
    );
  });
});
