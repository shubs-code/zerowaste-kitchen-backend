const express = require("express");
const {recipe } = require("../controllers/recipeController.js");

const router = express.Router();

router.post("/", recipe);

module.exports = router;
