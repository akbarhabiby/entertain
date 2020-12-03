// * Require Router from Express
const router = require('express').Router()

// * Import routes
const entertainme = require('./entertainme')
const movierouter = require('./movierouter')
const tvrouter = require('./tvrouter')

// * Use routes
router.use('/entertainme', entertainme)
router.use('/movies', movierouter)
router.use('/tv', tvrouter)

module.exports = router
