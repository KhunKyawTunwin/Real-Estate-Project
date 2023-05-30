const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const saltCode = Number(process.env.SALT);
const jwtSecrectKey = process.env.JWT__SECRECT;

// Register

exports.postRegister = async (req, res) => {
  try {
    const isExiting = await User.findOne({ email: req.body.email });

    if (isExiting) {
      throw new Error("Email is already registered!");
    }

    // Hashed User Password for safe

    const hashedPassword = await bcrypt.hash(req.body.password, saltCode);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    const { password, ...others } = newUser._doc;

    return res.status(201).json({ newUser });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Login

exports.postLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error(
        `Please check ${req.body.email}! & Wrong Credientail for user!`
      );
    }

    const comparePass = await bcrypt.compare(req.body.password, user.password);

    if (!comparePass) {
      throw new Error(`Password doesn't match with ${req.body.email}`);
    }

    const token = jwt.sign({ id: user._id }, jwtSecrectKey, {
      expiresIn: "3h",
    });

    const { password, ...others } = user._doc;

    return res.status(200).json({ user, token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};
