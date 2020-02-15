class ApplicationError extends Error {
  constructor(message, status) {
    super();
    Error.captureStackTrace(this, this.constructor);
    // const unCamelCase = require('../../utils/transform')();
    // this.name = unCamelCase.auth(this.constructor.name);
    this.message = message || 'Something went wrong. Please try again.';
    this.status = status || 500;
  }
}

module.exports = ApplicationError;
