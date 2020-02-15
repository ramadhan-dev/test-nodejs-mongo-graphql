const jwt = require('jsonwebtoken');
const InvalidToken = require('./../Errors/InvalidToken');
const UrlNotFound = require('./../Errors/UrlNotFound');

exports.expiredToken = (req, res, next) => {
  const authorizationHeaader = req.headers.authorization;
  if (authorizationHeaader) {
    const token = req.headers.authorization.split(' ')[1];
    const options = {
      expiresIn: '1h'
    };
    try {
      result = jwt.verify(token, process.env.JWT_KEY, options);
      req.decoded = result;
      next();
    } catch (err) {
      const error = new InvalidToken(err);
      res.json({
        error: error
      });
    }
  } else {
    const error = new UrlNotFound('URL not found Or Token required');
    res.json({
      error: error
    });
  }
};
