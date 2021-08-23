const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Define Schemes
const userSchema = new mongoose.Schema(
  {
    //user_id: { type: ObjectId, required: true },
    email: { type: String },
    name: { type: String },
    user_id: { type: Number }
  },
  {
    timestamps: true,
  }
);

// Create Model & Export
module.exports = mongoose.model("User", userSchema);
