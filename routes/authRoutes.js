const express = require("express");
const { registerUser, login, getNgo } = require("../controllers/authController.js");

const router = express.Router();

router.post("/sign-up", registerUser);

router.post("/login", login);

router.get("/getNgos", getNgo)

module.exports = router;
