const mongoose = require("mongoose");

// Define Schemes
const ingredientSchema = new mongoose.Schema(
  {
    basket_id: { type: Number, required: true, unique: true },
    user_id: { type: Number, required: true },
    list_name: { type: String },
  },
  {
    timestamps: true,
  }
);

// Create Model & Export
module.exports = mongoose.model("Basket", basketSchema);
