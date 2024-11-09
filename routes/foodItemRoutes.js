const express = require("express");
const {
  addFoodItem,
  getAllFoodItems,
  getFoodItemsByOwner,
  updateDate,
  updateValue,
} = require("../controllers/foodItemController.js");

const router = express.Router();

router.get("/", getAllFoodItems);

router.get("/:ownerId", getFoodItemsByOwner);

router.post("/", addFoodItem);

router.put("/date", updateDate);

router.put("/value", updateValue);

module.exports = router;
