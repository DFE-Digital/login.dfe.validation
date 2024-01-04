const { URL, parse } = require('url');
/**
 * A Utility class to test for valid url's
 * @param {string}      referrerUrl  target url
 * @returns {boolean}   when validate is called it will send true for valid no past history found 
 * and false when a match has been found
 */
class UrlValidator {
   
    constructor(referrerUrl) { 
       this.url = referrerUrl;
    }
    /**
     * This takes the target url check length
     * @param {number}  how long the string should be
     * @returns {boolean} if the url is too long it returns false
     */
    isCorrectLength(targetLength){
        return new Promise((resolve, reject) => {
            if(this.url === undefined || this.url === "" || typeof this.url !== 'string'){
                reject(new TypeError('is not a string or empty'));
            }
            if(this.url.length <= targetLength){
                const result = true;
                resolve(result);
            }else{
                const result = false;
                resolve(result);
            }
          });
    }
     /**
     * This takes the target url converts to a character
     * @oaram {array} list of allowed protocols
     * @returns {boolean} if the url is not the correct protocal 'http' or https' it returns false
     */
    isValidProtocal(protocols){
        return new Promise((resolve, reject) => {
            if(this.url === undefined || this.url === "" || typeof this.url !== 'string'){
                reject(new TypeError('is not a string or empty'));
            }
            try{
                const targetUrl = new URL(this.url);
               
                resolve(protocols
                    ? targetUrl.protocol
                        ? protocols.map(x => `${x.toLowerCase()}:`).includes(targetUrl.protocol)
                        : false
                    : true);
            }catch(e){
                reject(new TypeError(e));
            }
          });
    }

    hasLegalCharacters(){
        return new Promise((resolve, reject) => {
            if(this.url === undefined || this.url === "" || typeof this.url !== 'string'){
                reject(new TypeError('is not a string or empty'));
            }
            try{
                const expression = /[ < > # % { } -- | \ ^ ~ `]/g;
                const regex = new RegExp(expression);
                resolve(regex.test(this.url));
              
            }catch(e){
                reject(new TypeError(e));
            }
          });
    }
}

module.exports = UrlValidator;