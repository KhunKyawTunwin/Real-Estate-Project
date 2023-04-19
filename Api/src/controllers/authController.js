const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Register

exports.postRegister = async (req, res) => {
  try {
    const isExit = await User.findOne({ emai: req.body.email });

    if (isExit) {
      throw new Error("Email is already registered!");
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    const { password, ...others } = newUser._doc;

    const token = jwt.sign({ id: newUser._id }, process.env.JWT__SECRECT, {
      expiresIn: "3h",
    });

    return res.status(201).json({ others, token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

// Login

exports.postLogin = async (req, res) => {
  try {
    const user = await User.findOne({ emai: req.body.emai });
    if (!user) {
      throw new Error("Wrong Credentials!");
    }

    const comparePass = await bcrypt.compare(req.body.password, user.password);

    if (!comparePass) {
      throw new Error("Password is not equal with User Password.");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT__SECRECT, {
      expiresIn: "3h",
    });
    const { password, ...others } = user._doc;

    return res.status(200).json({ others, token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};