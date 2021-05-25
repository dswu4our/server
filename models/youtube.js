const mongoose = require("mongoose");

// Define Schemes
const youtubeSchema = new mongoose.Schema(
  {
    youtube_id: { type: Number, required: true, unique: true },
    youtube_url: { type: String, required: true },
    youtube_img: { type: String },
    youtube_title: { type: String },
  },
  {
    timestamps: true,
  }
);

// Create Model & Export
module.exports = mongoose.model("Youtube", youtubeSchema);
