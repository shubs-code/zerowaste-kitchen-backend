  const mongoose = require("mongoose");

  const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        default: "",
        trim: true,
      },
      email: {
        type: String,
        default: "",
      },
      password: {
        type: String,
        default: "",
      },
      mobileNumber: {
        type: String,
        default: "",
      },
      userId: {
        type: String,
        unique: true,
      },
      isOrganization: {
        type: Boolean,
        default: false,
      },
      location: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

  const User = mongoose.model("User", userSchema);

  module.exports = User;
