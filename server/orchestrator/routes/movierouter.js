// * Require Router from Express
const router = require('express').Router()

// * Use Controllers
const { MovieController } = require('../controllers')

// * APIs
router.get('/', MovieController.getAllMovies) // * Get All Movies
router.post('/', MovieController.postAddNewMovie) // * Create New Movie
router.get('/:movieId', MovieController.getMovieById) // * Get Movie by ID
router.put('/:movieId', MovieController.putEditMovieById) // * Edit Movie by Id
router.delete('/:movieId', MovieController.deleteMovieById) // * Edit Movie by Id

module.exports = router
