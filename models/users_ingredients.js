const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const ingredients = require("../models/ingredients");
// const users = require("../models/users");
// Define Schemes
const users_ingredientsSchema = new mongoose.Schema(
  {
    //type: Schema.Types.ObjectId, ref: "User"
    user_id: { type: Number, required: true },
    ing_name: { type: String },
    ing_frozen: { type: Number },
    ing_expir: { type: Date },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

// Create Model & Export
module.exports = mongoose.model("Users_Ingredients", users_ingredientsSchema);
