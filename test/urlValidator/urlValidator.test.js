const UrlValidator = require('../../src/urlValidator');

test('object is newed up', () => {
    const referrerUrl = 'HA77in3ss01';
    const validator = new UrlValidator(referrerUrl);
    expect(validator.url).toBe(referrerUrl);
    expect(typeof validator).toBe("object");
  });

  test('is correct length', () => {
    const referrerUrl = 'HA77in3ss01';
    const validator = new UrlValidator(referrerUrl);
    validator.isCorrectLength(11)
    .then((result) => expect(result).toBe(true))
    .catch((err) => console.error(err));
   
  });

  test('is incorrect length', () => {
    const referrerUrl = 'HA77in3ss01';
    const validator = new UrlValidator(referrerUrl);
    validator.isCorrectLength(10)
    .then((result) => expect(result).toBe(false))
    .catch((err) => console.error(err));
   
  });

  test('is wrong type ', () => {
    const referrerUrl = 15;
    const validator = new UrlValidator(referrerUrl);
    validator.isCorrectLength(10)
    .then((result) => expect(result).toBe(false))
    .catch((err) => expect(err).toHaveProperty('message', 'is not a string or empty'));
   
  });

  test('url is undefined', () => {
    const referrerUrl = undefined;
    const validator = new UrlValidator(referrerUrl);
    validator.isCorrectLength(10)
    .then((result) => expect(result).toBe(false))
    .catch((err) => expect(err).toHaveProperty('message', 'is not a string or empty'));
   
  });

  test('url is empty string ', () => {
    const referrerUrl = "";
    const validator = new UrlValidator(referrerUrl);
    validator.isCorrectLength(10)
    .then((result) => expect(result).toBe(false))
    .catch((err) => expect(err).toHaveProperty('message', 'is not a string or empty'));
   
  });
  test('is correct protocol for a non encrypted url', () => {
    const referrerUrl = 'http://google.com';
    const validator = new UrlValidator(referrerUrl);
    validator.isValidProtocal(['http', 'https'])
    .then((result) => expect(result).toBe(true))
    .catch((err) => expect(err).toHaveProperty('message', 'ReferenceError: Url is not defined'));
   
  });

  test('is correct protocol for a encrypted url', () => {
    const referrerUrl = "https://google.com";
    const validator = new UrlValidator(referrerUrl);
    validator.isValidProtocal(['http', 'https'])
    .then((result) => expect(result).toBe(true))
    .catch((err) => expect(err).toHaveProperty('message', 'ReferenceError:  is not defined'));
   
  });

  test('is incorrect protocol for a url', () => {
    const referrerUrl = 'mailto://google.com';
    const validator = new UrlValidator(referrerUrl);
    validator.isValidProtocal(['http', 'https'])
    .then((result) => expect(result).toBe(false))
    .catch((err) => expect(err).toHaveProperty('message', 'ReferenceError: Url is not defined'));
   
  });
  
  test('url is an empty string', () => {
    const referrerUrl = "";
    const validator = new UrlValidator(referrerUrl);
    validator.isValidProtocal(['http', 'https'])
    .then((result) => expect(result).toBe(true))
    .catch((err) => expect(err).toHaveProperty('message', 'is not a string or empty'));
  });

  test('url has no invalid characters', () => {
    const referrerUrl = 'https://www.google.com';
    const validator = new UrlValidator(referrerUrl);
    validator.hasLegalCharacters()
    .then((result) => expect(result).toBe(false))
    .catch((err) => expect(err).toHaveProperty('message', 'ReferenceError: Url is not defined'));
  });


  test('url has invalid characters', () => {
    const referrerUrl = 'https://www.google.com/my-services/cd3fc3db-21c7-4ed6-acc9-0bbf7fb1e5de/';
    const validator = new UrlValidator(referrerUrl);
    validator.hasLegalCharacters()
    .then((result) => expect(result).toBe(true))
    .catch((err) => expect(err).toHaveProperty('message', 'ReferenceError: Url is not defined'));
  });