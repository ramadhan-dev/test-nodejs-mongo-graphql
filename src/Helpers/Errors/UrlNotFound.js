// UserNotFoundError.js
const ApplicationError = require('./applicationError');
class UrlNotFound extends ApplicationError {
  constructor(message) {
    super(message || 'No User found.', 404);
  }
}
module.exports = UrlNotFound;
