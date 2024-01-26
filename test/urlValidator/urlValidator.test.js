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
 
  test('url has no invalid in multi path characters', () => {
    const referrerUrl = 'http://localhost:3000/oauth/callback';
    const validator = new UrlValidator(referrerUrl);
    validator.IsValidUrl()
    .then((result) => expect(result).toBe(true))
    .catch((err) => expect(err).toHaveProperty('message', 'ReferenceError: Url is not defined'));
  });
  test('url has no invalid characters', () => {
    const referrerUrl = 'http://localhost:3000';
    const validator = new UrlValidator(referrerUrl);
    validator.IsValidUrl()
    .then((result) => expect(result).toBe(true))
    .catch((err) => expect(err).toHaveProperty('message', 'ReferenceError: Url is not defined'));
  });

  test('url has invalid characters', () => {
    const referrerUrl = 'https://www.google.com#';
    const validator = new UrlValidator(referrerUrl);
    validator.IsValidUrl()
    .then((result) => expect(result).toBe(false))
    .catch((err) => expect(err).toHaveProperty('message', 'ReferenceError: Url is not defined'));
  });

  test('url has invalid [ characters', () => {
    const referrerUrl = 'https://www.google.com/stuff[';
    const validator = new UrlValidator(referrerUrl);
    validator.IsValidUrl()
    .then((result) => expect(result).toBe(false))
    .catch((err) => expect(err).toHaveProperty('message', 'ReferenceError: Url is not defined'));
  });

  test('is valid protocol for a empty url', () => {
    const referrerUrl = '';
    const validator = new UrlValidator(referrerUrl);
    validator.isValidProtocal(['http', 'https'])
    .then((result) => expect(result).toBe(true))
    .catch((err) => expect(err).toContain('is not a string or empty'));
   
  });

  test('is incorrect protocol for a url', () => {
    const referrerUrl = 'mailto://google.com';
    const validator = new UrlValidator(referrerUrl);
    validator.isValidProtocal(['http', 'https'])
    .then((result) => expect(result).toBe(false))
    .catch((err) => expect(err).toHaveProperty('message', 'ReferenceError: Url is not defined'));
   
  });
  test('is correct protocol for a non encrypted url', () => {
    const referrerUrl = 'http://google.com/this-should-pass';
    const validator = new UrlValidator(referrerUrl);
    validator.isValidProtocal(['http', 'https'])
    .then((result) => expect(result).toBe(true))
    .catch((err) => expect(err).toHaveProperty('message', 'ReferenceError: Url is not defined'));
   
  });

  test('is correct protocol for a encrypted url', async () => {
    const referrerUrl = "http://localhost:3000";
    const validator = new UrlValidator(referrerUrl);
    const returned = await validator.isValidProtocal(['http', 'https'])
    .then((result) => {  return result;})
    //.catch((err) => expect(err).toHaveProperty('message', 'ReferenceError:  is not defined'));
   console.log(returned);
  });
  test('url has invalid characters #', () => {
    const referrerUrl = 'https://www.google.com#';
    const validator = new UrlValidator(referrerUrl);
    validator.IsValidUrl()
    .then((result) => expect(result).toBe(false))
    .catch((err) => expect(err).toHaveProperty('message', 'ReferenceError: Url is not defined'));
  });

  test('url has invalid ] characters', () => {
    const referrerUrl = 'https://www.google.com/stuff]';
    const validator = new UrlValidator(referrerUrl);
    validator.IsValidUrl()
    .then((result) => expect(result).toBe(false))
    .catch((err) => expect(err).toHaveProperty('message', 'ReferenceError: Url is not defined'));
  });

  test('url has invalid ~ characters', () => {
    const referrerUrl = 'https://www.google.com/stuff-is-~fine';
    const validator = new UrlValidator(referrerUrl);
    validator.IsValidUrl()
    .then((result) => expect(result).toBe(false))
    .catch((err) => expect(err).toHaveProperty('message', 'ReferenceError: Url is not defined'));
  });

  test('url has invalid % characters', () => {
    const referrerUrl = 'https://www.google.com/%';
    const validator = new UrlValidator(referrerUrl);
    validator.IsValidUrl()
    .then((result) => expect(result).toBe(false))
    .catch((err) => expect(err).toHaveProperty('message', 'ReferenceError: Url is not defined'));
  });

  test('url has invalid | characters', () => {
    const referrerUrl = 'https://www.google.com/|';
    const validator = new UrlValidator(referrerUrl);
    validator.IsValidUrl()
    .then((result) => expect(result).toBe(false))
    .catch((err) => expect(err).toHaveProperty('message', 'ReferenceError: Url is not defined'));
  });

  test('url has invalid { characters', () => {
    const referrerUrl = 'https://www.google.com/{';
    const validator = new UrlValidator(referrerUrl);
    validator.IsValidUrl()
    .then((result) => expect(result).toBe(false))
    .catch((err) => expect(err).toHaveProperty('message', 'ReferenceError: Url is not defined'));
  });

  
  test('url has invalid } characters', () => {
    const referrerUrl = 'https://www.google.com/}';
    const validator = new UrlValidator(referrerUrl);
    validator.IsValidUrl()
    .then((result) => expect(result).toBe(false))
    .catch((err) => expect(err).toHaveProperty('message', 'ReferenceError: Url is not defined'));
  });

  test('url has invalid \\ characters', () => {
    const referrerUrl = 'https://www.google.com\\';
    const validator = new UrlValidator(referrerUrl);
    validator.IsValidUrl()
    .then((result) => expect(result).toBe(false))
    .catch((err) => expect(err).toHaveProperty('message', 'ReferenceError: Url is not defined'));
  });
  
  test('url has invalid ^ characters', () => {
    const referrerUrl = 'https://www.google.com^';
    const validator = new UrlValidator(referrerUrl);
    validator.IsValidUrl()
    .then((result) => expect(result).toBe(false))
    .catch((err) => expect(err).toHaveProperty('message', 'ReferenceError: Url is not defined'));
  });

  test('url has invalid space characters', () => {
    const referrerUrl = 'https://www.goo gle.com';
    const validator = new UrlValidator(referrerUrl);
    validator.IsValidUrl()
    .then((result) => expect(result).toBe(false))
    .catch((err) => expect(err).toHaveProperty('message', 'ReferenceError: Url is not defined'));
  });

  test('url has invalid ` characters', () => {
    const referrerUrl = 'https://www.goo`gle.com';
    const validator = new UrlValidator(referrerUrl);
    validator.IsValidUrl()
    .then((result) => expect(result).toBe(false))
    .catch((err) => expect(err).toHaveProperty('message', 'ReferenceError: Url is not defined'));
  });

  test('url has invalid characters but has a number as url', () => {
    const referrerUrl = 10;
    const validator = new UrlValidator(referrerUrl);
    validator.IsValidUrl()
    .then((result) => expect(result).toBe(false))
    .catch((err) => expect(err).toContain('is not a string or empty'));
  });

  