# login.dfe.validation

[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

Validation library for DfE Login

# Adding new validators

To add a new validator to the library:

- Add a new JS file with the name of your validator in the src folder
- Create a validator function that matches the following format (data:any)=>boolean The function should return true if the provided data is valid.
- Export your function
- Add your validator to the exports in the index.js
- **Update the readme.md**

# Password policy

Used to validate if a give password meets the password policy

```javascript
const passwordPolicy = require("login.dfe.validation").passwordPolicy;

const passwordMeetsPolicy =
  passwordPolicy.doesPasswordMeetPolicy("some-password");

const isPasswordBlackListed =
  passwordPolicy.isPasswordBlackListed("some-password");
```

# Express Validator Helpers

The express-validator helper library contains utility functions that make working with and testing express-validator middlware easier.

## validate

This is a wrapper function which returns a middleware function. The wrapper is configureable to allow the express validator to behave in different ways depending on the use case.

The returned middleware uses the validationResult function from express-validator to produce an array of errors. If an error exists the middleware can be configured to stop the middleare chain and return 400 response with details of the errors.

```javascript
router.post(
  "/",
  body("id").isUUID().withMessage("expected a UUID"),
  validate(),
  (req, res) => {
    res.send(200);
  },
);
```

If the body did not contain an id of type uuid, the following 400 JSON response would be seen.

```json
{
  "reasons": [
    {
      "name": "type",
      "message": "expected a number 1,2,4 or 5"
    }
  ]
}
```

The validation function also has a set of optional configuration.

### testing:boolean

Does not stop the middleware chain if true. Useful when you want to add validators to legacy code but do not want them to block. This would often be used in conjunction with the loggerCb to provide a log when the validators have failed.

### verbose:boolean

Detailed information returned about the errors if set to true. We return the property name and the message

### legacy:boolean

Formats the return value as an array of strings to match existing api. e.g

```json
    "reasons":[
        "name message"
    ]
```

### loggerCb:(function:(string)=>void)=>:void

A callback function which accepts a string for logging.

### responseName:string

The name used in the returned object default is reasons:[] e.g setting this to errors would yield.

```json
    "errors":[
        {
            "name":"example",
            "message":"This is a message"
        }
    ]
```

### loggerIncludeBody

Return the body in the logging callback if true. Use this for debugging when you are happy for the body to appear in the logging function. Note this is not sanitised so ensure no PII data is included or filter it within your logger.

### Default options

The default options are:

```javascript
let defaultOpts = {
  legacy: false,
  testing: false,
  verbose: true,
  loggerCb: undefined,
  loggerIncludeBody: false,
  responseName: "reasons",
};
```

## testValidatorArray

Many of the porjects do not make use of an Express testing tool such as Supertest. For this reason, a simple helper function is provided that can take an array of express-middlware functions and a mocked request and return an array of error messages that can easily be checked. An example of some testing code is shown below.

```javascript
let req = { id: "eadf9beb-1659-47e0-8726-a93498c3e389" };
let validators = [body("id").isUUID().withMessage("expected a UUID")];
let errors = await testValidatorArray(validators, req);
expect(errors.length).toBe(1);
expect(errors[0].name).toBe("id");
expect(errors[0].message).toBe("expected a UUID");
```

The function testValidator array recieves an array of express-validator middlware functions and outputs a simple error array in the following format.

```json
[
  {
    "name": "id",
    "message": "expected a UUID"
  }
]
```
