const mongoose = require("mongoose");

// Define Schemes
const userSchema = new mongoose.Schema(
  {
    user_id: { type: Number, required: true, unique: true },
    email: { type: String },
    name: { type: String },
  },
  {
    timestamps: true,
  }
);

// Create Model & Export
module.exports = mongoose.model("User", userSchema);
