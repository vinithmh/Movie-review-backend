const { default: mongoose } = require("mongoose");

const movieReviewTemplate = new mongoose.Schema({
  movieName: { type: String, required: true },
  movieReview: { type: String, required: true },
});

module.exports = mongoose.model("movietable", movieReviewTemplate);
