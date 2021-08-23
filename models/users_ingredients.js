const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ingredients = require("../models/ingredients");

// Define Schemes
const users_ingredientsSchema = new mongoose.Schema(
  {
    //type: Schema.Types.ObjectId, ref: "User"
    user_id: { type: Number, required: true },
    // ing_name: { type: String },
    // ing_name: { type: mongoose.Schema.Types.ObjectId, ref: ingredients },
    ing: { type: mongoose.Schema.Types.ObjectId, ref: ingredients },
    ing_frozen: { type: Number },
    ing_expir: { type: Date },
    check: { type: Number },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

// Create Model & Export
module.exports = mongoose.model("Users_Ingredients", users_ingredientsSchema);
