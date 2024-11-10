const express = require("express");
const {
  addFoodItem,
  getAllFoodItems,
  getFoodItemsByOwner,
  updateDate,
  donate, 
  updateValue,
} = require("../controllers/foodItemController.js");

const router = express.Router({ mergeParams: true });

router.get("/", getAllFoodItems);

router.get("/:ownerId", getFoodItemsByOwner);

router.post("/", addFoodItem);

router.put("/date", updateDate);

router.put("/donate", donate);

router.put("/value", updateValue);

module.exports = router;
