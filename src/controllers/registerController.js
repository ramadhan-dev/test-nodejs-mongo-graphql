const Register = require('./../models/register');
const bcrypt = require('bcryptjs');
exports.store = (req, res) => {
  bcrypt.genSalt(10)
    .then(hash => {
      req.body.password = hash;
      const register = new Register(req.body);
      saveData(register, res)
    })
    .catch(error => {
      res.status(409).json({
        error: error
      });
    })
};

// save data into database
const saveData = (register, res) => {
  register.save()
    .then(result => {
      res.status(200).json({
        data: result,
      });
    })
    .catch(error => {
      res.status(409).json({
        error: error.errmsg
      });
    });
}

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