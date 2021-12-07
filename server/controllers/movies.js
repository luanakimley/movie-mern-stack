const moviesModel = require("../models/movies");

// Read all records
exports.getAllMovies = (req, res) => {
  moviesModel.find((error, data) => {
    res.json(data);
  });
};

// Read one record
exports.getOneMovie = (req, res) => {
  moviesModel.findById(req.params.id, (error, data) => {
    res.json(data);
  });
};

// Add new movie
exports.addMovie = (req, res) => {
  const today = new Date();
  if (req.body.title === "") {
    res.json({ errorMessage: `Title is required.` });
  } else if (req.body.year < 1800 || req.body.year > today.getFullYear()) {
    res.json({ errorMessage: `Year must be between 1800 and this year.` });
  } else if (req.body.runtime <= 0) {
    res.json({ errorMessage: `Runtime must be a positive number.` });
  } else if (!/^[a-zA-Z\s,]+$/.test(req.body.director)) {
    res.json({ errorMessage: `Director must be a string.` });
  } else if (!/^[a-zA-Z\s,]+$/.test(req.body.actors)) {
    res.json({ errorMessage: `Actors must be a string.` });
  } else {
    moviesModel.create(req.body, (error, data) => {
      res.json(data);
    });
  }
};

// Add movie dataset
exports.addMovieDataset = (req, res) => {
  moviesModel.insertMany(req.body, (error, data) => {
    res.json(data);
  });
};

// Delete movie
exports.deleteMovie = (req, res) => {
  moviesModel.findByIdAndRemove(req.params.id, (error, data) => {
    res.json(data);
  });
};

// Edit movie
exports.updateMovie = (req, res) => {
  const today = new Date();
  if (req.body.title === "") {
    res.json({ errorMessage: `Title is required.` });
  } else if (req.body.year < 1800 || req.body.year > today.getFullYear()) {
    res.json({ errorMessage: `Year must be between 1800 and this year.` });
  } else if (req.body.runtime <= 0) {
    res.json({ errorMessage: `Runtime must be a positive number.` });
  } else if (!/^[a-zA-Z\s,]+$/.test(req.body.director)) {
    res.json({ errorMessage: `Director must be a string.` });
  } else if (!/^[a-zA-Z\s,]+$/.test(req.body.actors)) {
    res.json({ errorMessage: `Actors must be a string.` });
  } else {
    moviesModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      (error, data) => {
        res.json(data);
      }
    );
  }
};
