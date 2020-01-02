exports.createUser = (req, res, next) => {
  // check username
  req.check('username', 'Write UserName').notEmpty();
  req.check('username', 'Username must between 6 to 15 charackter').isLength({
    min: 6,
    max: 50
  });
  req.check('username', 'Usernames must between 8 to 15 character, use uppercase letters, numbers and special characters').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/);


  // check password
  req.check('password', 'Write a Password').notEmpty();
  req.check('password', 'Password must between 8 to 20 charackter').isLength({
    min: 8,
    max: 15
  });

  const errors = req.validationErrors();

  if (errors) {
    const error = errors.map(error => {
      return {
        [error.param]: error.msg
      };
    });
    return res.status(422).json(error);
  }
  next();
};