const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const login = async (req, res, _next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).send({
        message: "Masukkan email dan password",
        data: null,
      });
    }

    const user = await User.findOne({
      attributes: ["id", "fullname", "username", "email", "password"],
      where: { email },
    });

    if (!user) {
      return res.status(401).send({
        data: null,
        message: "User tidak ditemukan",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Password salah");
      return res.status(401).send({
          data: null,
          message: "Password salah, coba lagi!",
      });
    }

    const token = jwt.sign(
      { id: user.id, fullname: user.fullname, username: user.username, email: user.email },
      process.env.JWT_SECRET
    );

    return res.send({
      message: "Login berasil",
      data: { token },
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal server error",
      data: null,
    });
  }
};

const register = async (req, res, _next) => {
  const { fullname, username, email, password } = req.body;

  try {
    if (!fullname || !username || !email || !password) {
      return res.status(400).send({
        message: "Masukkan nama lengkap, username, email, dan password",
        data: null,
      });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).send({
        message: "Email sudah terdaftar",
        data: null,
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullname,
      username,
      email,
      password: passwordHash,
    });

    return res.status(201).send({
      message: "Registrasi berasil",
      data: {
        id_user: user.id_user,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).send({
        data: null,
        message: "Internal server error",
    });
  }
};

module.exports = { login, register };
