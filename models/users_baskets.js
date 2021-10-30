const mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Define Schemes
const users_basketsSchema = new mongoose.Schema(
  {
    user_id: { type: Number,
      //required: true, 오류나서 지움
      ref: "User"}, 
    ing_name: { type:String, 
      ref: "User"},
  },
  {
    timestamps: true,
  }
);

// Create Model & Export
module.exports = mongoose.model("Users_Baskets", users_basketsSchema);
