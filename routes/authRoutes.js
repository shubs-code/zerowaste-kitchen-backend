const express = require("express");
const { registerUser, login } = require("../controllers/authController.js");

const router = express.Router();

router.post("/sign-up", registerUser);

router.post("/login", login);

module.exports = router;
