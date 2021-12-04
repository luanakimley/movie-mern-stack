const mongoose = require(`mongoose`);

let moviesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    year: { type: Number, required: true },
    runtime: { type: Number, required: true },
    genres: { type: Array, required: true },
    director: { type: String, required: true },
    actors: { type: String, required: true },
    plot: { type: String, required: true },
    posterUrl: { type: String },
  },
  {
    collection: `movies`,
  }
);

moviesSchema.index({ title: 1, year: 1 }, { unique: true });

module.exports = mongoose.model(`movies`, moviesSchema);
