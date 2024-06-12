const { isEmail, isStrongPassword } = require("validator");
const { User: UserModel } = require("../models");

const validateRegister = async (req, res, next) => {
  const { fullname, username, email, password } = req.body;

  if (!fullname || !username || !email || !password) {
    return res.status(400).send({
      message: "Bad request",
      data: null,
    });
  }

  if (!isEmail(email)) {
    return res.status(400).send({
      message: "Invalid email",
      data: null,
    });
  }

  if (
    !isStrongPassword(password, {
      minLength: 4,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0,
    })
  ) {
    return res.status(400).send({
      message: "Password is too weak",
      data: null,
    });
  }

  const emailCheck = await UserModel.findOne({
    where: { email },
  });
  if (emailCheck) {
    return res.status(400).send({
      message: "Email already registered",
      data: null,
    });
  }

  next();
};


const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      message: "Bad request",
      data: null,
    });
  }

  if (!isEmail(email)) {
    return res.status(400).send({
      message: "Invalid email",
      data: null,
    });
  }

  next();
};

module.exports = { validateRegister, validateLogin };
