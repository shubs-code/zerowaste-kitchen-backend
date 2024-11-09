const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
      trim: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      default: "",
    },
    expiry: {
      type: Date,
      default: Date.now(),
    },
    owner: {
      type: String,
      default: "",
    },
    hasPutToDonate: {
      type: Boolean,
      unique: false,
    },
    isDonated: {
      type: Boolean,
      default: false,
    },
    isConsumed: {
      type: Boolean,
      default: false,
    },
    consumptionTime: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);

const FoodItem = mongoose.model("FoodItem", foodItemSchema);

module.exports = FoodItem;
