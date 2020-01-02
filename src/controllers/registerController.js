const Register = require('./../models/register');
const {
  validationResult
} = require('express-validator/check');
exports.store = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errors: errors.array()
    });
  }
  const register = new Register(req.body);

  register.save((err, result) => {
    if (err) {
      return res.status(409).json({
        error: err.errmsg
      });
    }
    res.status(200).json({
      message: result
    });
  });
};

exports.getUsername = async username => {
  const query = {
    username: username
  };
  try {
    return await Register.find(query);
  } catch (err) {
    throw err;
  }
};