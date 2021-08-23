
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Define Schemes
const users_ingredientsSchema = new mongoose.Schema(
  {
    //user_id: { type: ObjectId, required: true },
    user_id: { 
      type: Number,
      required: true,
      ref: "User", required: true, unique: true },
    ing_name: { 
      type: String,
      required: true,
      ref: "Ingredient", required: true, unique: true },
    ing_frozen: { type: Number, required: true },
    ing_expir: { type: Date},
    check: { type: Number, required: true }
  },
  {
    timestamps: true,
  }
);

// Create Model & Export
module.exports = mongoose.model("Users_Ingredients", users_ingredientsSchema);

