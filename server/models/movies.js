const mongoose = require(`mongoose`);

let moviesSchema = new mongoose.Schema(
  {
    title: { type: String },
    year: { type: Number },
    runtime: { type: Number },
    genres: [String],
    director: { type: String },
    actors: { type: String },
    plot: { type: String },
    posterUrl: { type: String },
  },
  {
    collection: `movies`,
  }
);

module.exports = mongoose.model(`movies`, moviesSchema);
