const FoodItem = require("../models/FoodItem");
const uuid = require("uuid");

const addFoodItem = async (req, res) => {
  try {
    const { foodItemName, quantity, expiry, owner, description, imageUrl } =
      req.body;

    if (
      !foodItemName ||
      !quantity ||
      !expiry ||
      !owner ||
      !description ||
      !imageUrl
    ) {
      return res.status(200).json({
        statusText: "incorrect-data-sent",
      });
    }

    const foodItem = await FoodItem.create({
      name: foodItemName,
      quantity,
      expiry: new Date(expiry),
      owner,
      description,
      imageUrl,
      id: uuid.v4(),
    });

    if (!foodItem) {
      return res.status(200).json({
        statusText: "failed",
      });
    }
    return res.status(200).json({
      statusText: "success",
    });
  } catch (error) {
    console.log("Error from foodItemController's addFoodItemV", error);
    return res.status(500).json({
      statusText: "failed",
      userId: null,
    });
  }
};

const updateDate = async (req, res) => {
  try {
    const { key, value, id } = req.body;

    if (!key || !value || !id) {
      return res.status(400).json({
        statusText: "incorrect-data-sent",
      });
    }

    await FoodItem.findOneAndUpdate(
      { id: id },
      { [key]: new Date(value) },
      { new: true }
    );

    return res.status(200).json({
      statusText: "success",
    });
  } catch (error) {
    return res.status(500).json({
      statusText: "failed",
    });
  }
};

const updateValue = async (req, res) => {
  try {
    const { key, value, id } = req.body;

    if (!key || !value || !id) {
      return res.status(400).json({
        statusText: "incorrect-data-sent",
      });
    }

    await FoodItem.findOneAndUpdate(
      { id: id },
      { [key]: value },
      { new: true }
    );

    return res.status(200).json({
      statusText: "success",
    });
  } catch (error) {
    return res.status(500).json({
      statusText: "failed",
    });
  }
};

const getAllFoodItems = async (req, res) => {
  try {
    const foodItems = await FoodItem.find({});

    return res.status(200).json({
      statusText: "success",
      foodItems: foodItems,
    });
  } catch (error) {
    console.error("Error from getAllFoodItems:", error);
    return res.status(500).json({
      statusText: "failed",
    });
  }
};

const getFoodItemsByOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;

    if (!ownerId) {
      return res.status(400).json({
        statusText: "ownerId-is-required",
      });
    }

    const foodItems = await FoodItem.find({ owner: ownerId });

    return res.status(200).json({
      statusText: "success",
      foodItems: foodItems,
    });
  } catch (error) {
    console.error("Error from getFoodItemsByOwner:", error);
    return res.status(500).json({
      statusText: "failed",
    });
  }
};

module.exports = {
  addFoodItem,
  updateDate,
  updateValue,
  getAllFoodItems,
  getFoodItemsByOwner,
};
