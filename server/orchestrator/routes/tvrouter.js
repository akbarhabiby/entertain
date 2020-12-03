// * Require Router from Express
const router = require('express').Router()

// * Use Controllers
const { TVController } = require('../controllers/')

// * APIs
router.get('/', TVController.getAllTVSeries) // * Get All TV Series
router.post('/', TVController.postAddNewTVSerie) // * Create New TV Serie
router.get('/:tvId', TVController.getTVSerieById) // * Get TV Serie by ID
router.put('/:tvId', TVController.putEditTVSerieById) // * Edit TV Serie by Id
router.delete('/:tvId', TVController.deleteTVSerieById) // * Delete TV Serie by Id

module.exports = router
