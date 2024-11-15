const mongoose = require("mongoose");
const Schema=mongoose.Schema;
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
    imageUrl: {
      type: String,
      default: "",
    },
    expiry: {
      type: Date,
      default: Date.now(),
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    hasPutToDonate: {
      type: Boolean,
      unique: false,
    },
    isDonated: {
      type: Boolean,
      default: false,
    },
    donatedTo: {
      type: String,
      default: "",
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
