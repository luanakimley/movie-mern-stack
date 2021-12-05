const mongoose = require(`mongoose`);

let moviesSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    year: {
      type: Number,
      required: true,
      min: 1800,
      max: new Date().getFullYear(),
    },
    runtime: { type: Number, required: true, min: 1 },
    genres: [
      {
        type: String,
        required: true,
        enum: [
          "Action",
          "Adventure",
          "Animation",
          "Biography",
          "Comedy",
          "Crime",
          "Documentary",
          "Drama",
          "Family",
          "Fantasy",
          "Film-Noir",
          "Game-Show",
          "History",
          "Horror",
          "Music",
          "Musical",
          "Mystery",
          "News",
          "Reality-TV",
          "Romance",
          "Sci-Fi",
          "Sport",
          "Talk-Show",
          "Thriller",
          "War",
          "Western",
        ],
      },
    ],
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
