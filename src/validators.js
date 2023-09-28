const { validationResult } = require('express-validator');

/**
 * A Utility function to make testing error middleware easier
 * where Supertest cannot be used. Create an array of the express-validator
 * middleware and pass it with a fake request to generate an errors array
 * @param {Function[]}  validators  express validators array
 * @param {Object}      req         mocked request 
 * @returns 
 */
const testValidatorArray = async function(validators,req){
 await Promise.all(validators.map(async v =>{
    await v(req,{},()=>{});
  }));
  return formatValidatorErrors(validationResult(req).array());
}

/**
 * Formats the standard response from express-validator
 * To make the output more friendly.
 * Can also be used in testing to make it easier to check
 * expected output
 */
const formatValidatorErrors = function (errors) {
    let prettyErrorsLog = [];
    for (const e of errors) {
        if (e.nestedErrors) {
            prettyErrorsLog = [
                ...prettyErrorsLog,
                ...formatValidatorErrors(e.nestedErrors)
            ]
        } else {
            prettyErrorsLog.push({
                name: e.param || e.path,
                message: e.msg
            })
        }
    }
    return prettyErrorsLog;
}

/**
 * Converts the array of objects to array of strings
 * for compatability with legacy api
 * @param   {Object[]} errors
 * @param   {string}   errors[].name
 * @param   {string}   errors[].message
 * @returns {string[]}
 */
const legacy = function(errors){
    return errors.map(e=>`${e.name} ${e.message}`);
}

/**
 * Utility method for returning a non verbose error message
 * if privacy of validation is a convern
 * @returns   {Object[]} errors
 * @returns   {string}   errors[].name
 * @returns   {string}   errors[].message
 */
const nonVerbose = function(){
    return [{name:"error","message":"A validation error occurred"}]
}

/**
 * Generates an express validator middleware 
 * validator function.
 * Checks to see if validation errors have 
 * occurred and if so stops the middleware
 * chain.
 * @param {Object?}     opts                    Configuration options for the middleware
 * @param {boolean}     opts.testing            Does not stop the middleware chain if true
 * @param {boolean}     opts.verbose            Detailed information returned about the errors if set to true
 * @param {boolean}     opts.legacy             Formats the return value as an array of strings to match existing api
 * @param {function}    opts.loggerCb           A callback function which accepts a string for logging
 * @param {String}      opts.responseName       The name used in the returned object default is reasons:[]
 * @param {boolean}     opts.loggerIncludeBody  Return the body in the logging callback if true
 */
const validate = function (opts = {}) {

    let defaultOpts = {
        legacy: false,
        testing: false,
        verbose: true,
        loggerCb: undefined,
        loggerIncludeBody:false,
        responseName:"reasons"
    }
    opts = { ...defaultOpts, ...opts };

    return (req, res, next) => {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next();
        }
        let formattedErrors = formatValidatorErrors(errors.array());

        //if we have a call back for logging call it
        if (opts.loggerCb) {
            let loggerData = {
                validationErrors:formattedErrors,
                body:opts.loggerIncludeBody?req.body:null
            };
            opts.loggerCb(JSON.stringify(loggerData));
        }
        //if we are running in test mode, return as normal
        if (opts.testing) {
            return next();
        }
        //if legacy, return plain string array
        if(opts.legacy){
            return res.status(400).json({
                [opts.responseName]: opts.verbose ? legacy(formattedErrors) : legacy(nonVerbose())
            })
        }
        //if new send back object array
        return res.status(400).json({
            [opts.responseName]: opts.verbose ? formattedErrors : nonVerbose()
        })
    }
}
module.exports = {
    validate,
    testValidatorArray
}