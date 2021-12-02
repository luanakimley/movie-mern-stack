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
  moviesModel.create(req.body, (error, data) => {
    res.json(data);
  });
});

// Delete one record
router.delete(`/movies/:id`, (req, res) => {
  moviesModel.findByIdAndRemove(req.params.id, (error, data) => {
    res.json(data);
  });
});

module.exports = router;
