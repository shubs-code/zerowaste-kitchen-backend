const FoodItem = require("../models/FoodItem");
const uuid = require("uuid");
const mongoose=require("mongoose");

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

const donate=async(req, res)=>{
  try{
    const {donatedTo, id}=req.body;
    console.log(donatedTo + " " + id);
    const foodItem=await FoodItem.findById(id);
    if(foodItem){
      foodItem.findOneAndUpdate({hasPutToDonate: true, donatedTo: donatedTo})
    }

    res.status(200).json({
      status: "success"
    })
  }
  catch(error){
    console.log(error);
    res.status(401).json({
      errorMsg:error,
      status: "failure"
    })
  }
}

const getFoodItemsByOwner = async (req, res) => {
  try {
    const { ownerId } = req.params; // Get ownerId from query params
    if (!ownerId) {
      return res.status(400).json({
        statusText: "ownerId-is-required",
      });
    }

    // Validate if the ownerId is a valid ObjectId
    if (!mongoose.isValidObjectId(ownerId)) {
      return res.status(400).json({
        statusText: "invalid-ownerId",
      });
    }

    // Find food items by owner
    const foodItems = await FoodItem.find({ owner: ownerId }); // Mongoose automatically handles ObjectId conversion

    if (foodItems.length === 0) {
      return res.status(404).json({
        statusText: "no-food-items-found",
      });
    }

    console.log(foodItems);
    return res.status(200).json({
      statusText: "success",
      foodItems: foodItems,
    });
  } catch (error) {
    console.error("Error from getFoodItemsByOwner:", error);
    return res.status(500).json({
      statusText: "failed",
      error: error.message,
    });
  }
};


module.exports = {
  addFoodItem,
  updateDate,
  updateValue,
  getAllFoodItems,
  getFoodItemsByOwner,
  donate
};
