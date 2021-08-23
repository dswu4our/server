const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Define Schemes
const ingredientSchema = new mongoose.Schema(
  {
    // ing_id: { type: Number, required: true },
    _id: Schema.Types.ObjectId,
    ing_name: { type: String, required: true },
    img: { type: String },
  },
  {
    timestamps: true,
  }
);

// Create Model & Export
module.exports = mongoose.model("Ingredient", ingredientSchema);

// // Create new todo document
// ingredientSchema.statics.create = function (payload) {
//     // this === Model
//     const todo = new this(payload);
//     // return Promise
//     return todo.save();
//   };

//   // Find All
//   ingredientSchema.statics.findAll = function () {
//     // return promise
//     // V4부터 exec() 필요없음
//     return this.find({});
//   };

//   // Find One by todoid
//   ingredientSchema.statics.findOneByTodoid = function (todoid) {
//     return this.findOne({ todoid });
//   };

//   // Update by todoid
//   ingredientSchema.statics.updateByTodoid = function (todoid, payload) {
//     // { new: true }: return the modified document rather than the original. defaults to false
//     return this.findOneAndUpdate({ todoid }, payload, { new: true });
//   };

//   // Delete by todoid
//   ingredientSchema.statics.deleteByTodoid = function (todoid) {
//     return this.remove({ todoid });
//   };
