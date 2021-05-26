const mongoose = require("mongoose");

// Define Schemes
const refrigeratorSchema = new mongoose.Schema(
  {
    ref_id: { type: Number, required: true, unique: true },
    user_id: { type: Number, required: true },
    ing_id: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

// Create Model & Export
module.exports = mongoose.model("Refrigerator", refrigeratorSchema);
