const mongoose = require("mongoose");
//const { schema } = require("./ingredients");

var Schema = mongoose.Schema;


// Define Schemes
const recipeSchema = new mongoose.Schema(
  {
    recipe_name: { type: String, required: true, unique: true },
    ings_name: {
      type: Array,
      required: true,
      ref: "Ingredient",
      require: true
    }
    //youtube_id: { type: Number, required: true },
    //recipe_check: { type: Boolean },
  },
  {
    timestamps: true
  }
);

  /*{
    ings_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Ingredient",
      require: true,
    },
    recipe_id: { type: Number, required: true, unique: true },
    youtube_id2: { type: Number, required: true },
    recipe_name: { type: String },
    recipe_check: { type: Boolean },
  },
  {
    timestamps: true,
  }
);*/

// Create Model & Export
module.exports = mongoose.model("Recipe", recipeSchema);
