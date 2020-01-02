exports.createUser = (req, res, next) => {
  req.check('username', 'Write UserName').notEmpty();
  req.check('username', 'username must between 6 to 15 charackter').isLength({
    min: 6,
    max: 15
  });

  req.check('password', 'Write a Password').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    const error = errors.map(error => {
      return { [error.param]: error.msg };
    })[0];
    return res.status(400).json(error);
  }
  next();
};
