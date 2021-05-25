const mongoose = require("mongoose");

// Define Schemes
const recipeSchema = new mongoose.Schema(
  {
    recipe_id: { type: Number, required: true, unique: true },
    youtube_id2: { type: Number, required: true },
    recipe_name: { type: String },
    recipe_check: { type: Number },
  },
  {
    timestamps: true,
  }
);

// Create Model & Export
module.exports = mongoose.model("Recipe", recipeSchema);
