const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();

// Register Route for user

router.post("/register", authController.postRegister);

router.post("/login", authController.postLogin);

// Get all Porpety

// router.get("/getAll");

module.exports = router;
