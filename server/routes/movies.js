const router = require(`express`).Router();

const {
  getAllMovies,
  getOneMovie,
  addMovie,
  addMovieDataset,
  deleteMovie,
  updateMovie,
} = require("../controllers/movies");

router.get(`/movies`, getAllMovies);
router.get(`/movies/:id`, getOneMovie);
router.post(`/movies`, addMovie);
router.post(`/movies`, addMovieDataset);
router.delete(`/movies/:id`, deleteMovie);
router.put(`/movies/:id`, updateMovie);

module.exports = router;
