const Register = require("./../models/register");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
  const query = {
    username: req.body.username
  };
  Register.findOne(query)
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          error: "User not fount"
        });
      }

      // check password
      checkPassword(req.body.password, user.password)
        .then(userValid => {
          if (userValid) {
            const token = jwt.sign({
                email: user.email,
                userId: user._id,
                username: user.username
              },
              process.env.JWT_KEY, {
                expiresIn: "1h"
              }
            );

            return res.status(200).json({
              message: "Auth successful",
              data: token
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
};

const checkPassword = async (password, hash) => {
  const res = await bcrypt.compare(password, hash);
  if (res) {
    return true;
  }
  return false;
};