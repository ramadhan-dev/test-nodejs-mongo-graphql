// UserNotFoundError.js
const ApplicationError = require('./applicationError');
class InvalidToken extends ApplicationError {

    constructor(message) {
        super(message || 'Token Invalid.', 421);
    }
}
module.exports = InvalidToken;