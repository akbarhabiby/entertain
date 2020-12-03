// * Require Router from Express
const router = require('express').Router()

// * Use Controllers
const { EntertainmeController } = require('../controllers/')

// * APIs
router.get('/', EntertainmeController.getMovieAndTVSeries) // * Get All Movies and TV Series

module.exports = router
