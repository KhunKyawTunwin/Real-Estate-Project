const express = require("express");
const User = require("../models/User");
const { body, check } = require("express-validator");

const authController = require("../controllers/authController");

const router = express.Router();

// Register Route for user

router.post(
  "/register",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        //   if (value === "kyawtunwin000782@gmail.com") {
        //     throw new Error("This email address if forbidden.");
        //   }
        //   return true;
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject(
              "E-Mail already exits, Plsease use a different one."
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      "password",
      "Please enter a password with only numbers and text and at least 5 characters."
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password have to match!");
      }
      return true;
    }),
  ],

  authController.postRegister
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address.")
      .normalizeEmail(),
    body("password", "Password has to be valid.")
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
  ],
  authController.postLogin
);

// Get all Porpety

// router.get("/getAll");

module.exports = router;
