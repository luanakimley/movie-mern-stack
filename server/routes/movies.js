const router = require(`express`).Router();

const moviesModel = require(`../models/movies`);

// read all records
router.get(`/movies`, (req, res) => {
  moviesModel.find((error, data) => {
    res.json(data);
  });
});

// Read one record
router.get(`/movies/:id`, (req, res) => {
  moviesModel.findById(req.params.id, (error, data) => {
    res.json(data);
  });
});

// Add new record
router.post(`/movies`, (req, res) => {
  const today = new Date();
  if (req.body.year < 1800 || req.body.year > today.getFullYear()) {
    res.json({ errorMessage: `Year must be between 1800 and this year.` });
  } else if (req.body.runtime <= 0) {
    res.json({ errorMessage: `Runtime must be a positive number.` });
  } else {
    moviesModel.create(req.body, (error, data) => {
      res.json(data);
    });
  }
});

// Add new dataset
router.post(`/movies`, (req, res) => {
  moviesModel.insertMany(req.body, (error, data) => {
    res.json(data);
  });
});

// Delete one record
router.delete(`/movies/:id`, (req, res) => {
  moviesModel.findByIdAndRemove(req.params.id, (error, data) => {
    res.json(data);
  });
});

// Update one record
router.put(`/movies/:id`, (req, res) => {
  const today = new Date();
  if (req.body.year < 1800 || req.body.year > today.getFullYear()) {
    res.json({ errorMessage: `Year must be between 1800 and this year.` });
  } else if (req.body.runtime <= 0) {
    res.json({ errorMessage: `Runtime must be a positive number.` });
  } else {
    moviesModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      (error, data) => {
        res.json(data);
      }
    );
  }
});

module.exports = router;
