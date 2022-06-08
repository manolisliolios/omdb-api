import { Router } from 'express';
import MoviesController from "../controllers/movies.controller";

const router = Router();

router.get('/', MoviesController.findMovies);
router.get('/:movieId', MoviesController.findMovieById);

module.exports = router;