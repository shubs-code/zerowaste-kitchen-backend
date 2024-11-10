const express = require("express");
const {
  addFoodItem,
  getAllFoodItems,
  getFoodItemsByOwner,
  updateDate,
  donate, 
  updateValue,
} = require("../controllers/foodItemController.js");

const router = express.Router({mergeParams: true});

router.get("/:ownerId", getFoodItemsByOwner);

router.get("/", getAllFoodItems);


router.post("/", addFoodItem);

router.put("/date", updateDate);

router.put("/donate", donate);

router.put("/value", updateValue);

module.exports = router;
