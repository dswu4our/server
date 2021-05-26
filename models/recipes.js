const mongoose = require("mongoose");

// Define Schemes
const recipeSchema = new mongoose.Schema(
  {
    recipe_id: { type: Number, required: true, unique: true },
    //youtube_id: { type: Number, required: true },
    recipe_name: { type: String, unique: true },
    //recipe_check: { type: Number },
    ings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ingredient' }],
    //youtubes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'youtube' }]
  },
  {
    timestamps: true,
  }
);

// Create Model & Export
module.exports = mongoose.model("Recipe", recipeSchema);
