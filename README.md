# login.dfe.validation
[![Build Status](https://travis-ci.org/DFE-Digital/login.dfe.validation.svg?branch=master)](https://travis-ci.org/DFE-Digital/login.dfe.validation)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

Validation library for DfE Login

# Password policy
Used to validate if a give password meets the password policy

```javascript
const passwordPolicy = require('login.dfe.validation').passwordPolicy;

const passwordMeetsPolicy = passwordPolicy.doesPasswordMeetPolicy('some-password');
```