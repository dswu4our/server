const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Define Schemes
const ingredientSchema = new mongoose.Schema(
  {
    // ing_id: { type: Number, required: true },
    _id: Schema.Types.ObjectId,
    ing_name: { type: String, required: true },
    ing_img: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Create Model & Export
module.exports = mongoose.model("Ingredient", ingredientSchema);
