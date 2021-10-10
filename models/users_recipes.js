const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Define Schemes
const users_recipesSchema = new mongoose.Schema(
  {
    recipe_name: {
      type: String,
      required: true,
      ref: "Recipe",
      //required: true,
      unique: true,
    },
    user_id: {
      type: Number,
      required: true,
      ref: "User",
      //required: true,
      unique: true,
    },
    recipe_check: { type: Number },
    recipe_ht: { type: Number },
  },
  {
    timestamps: true,
  }
);

// Create Model & Export
module.exports = mongoose.model("Users_Recipes", users_recipesSchema);
