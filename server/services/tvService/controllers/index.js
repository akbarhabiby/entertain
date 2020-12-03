const { db, ObjectId, Double } = require('../db/config')
const tvSeries = db.collection('tvseries')

class TVController {
  static async getAllTVSeries(req, res, next) {
    try {
      // * The Method
      const arrTVSeries = await tvSeries.find().toArray()

      // * Send Status
      res.status(200).json(arrTVSeries)
    } catch (err) {
      next(err)
    }
  }

  static async getTVSerieById(req, res, next) {
    try {
      const { tvId } = req.params
      
      // * MongoDB Parameters
      const query = { _id: ObjectId(tvId) }

      // * The Method
      const tvSerie = await tvSeries.findOne(query)

      // * Send Status
      res.status(200).json(tvSerie)
    } catch (err) {
      next(err)
    }
  }

  static async postAddNewTVSerie(req, res, next) {
    try {
      const { title, overview, poster_path, popularity, tags } = req.body
      const doublePopularity = Double(popularity)
      const arrTags = tags.split(', ')

      // * New Item
      const objTVSerie = {
        title: title,
        overview: overview,
        poster_path: poster_path,
        popularity: doublePopularity,
        tags: arrTags
      }

      // * The Method
      const { ops } = await tvSeries.insertOne(objTVSerie)
      
      // * Send Status
      res.status(201).json(ops[0])
    } catch (err) {
      next(err)
    }
  }

  static async putEditTVSerieById(req, res, next) {
    try {
      const { tvId } = req.params
      const { title, overview, poster_path, popularity, tags } = req.body
      const doublePopularity = Double(popularity)
      const arrTags = tags.split(', ')

      // * New Item Value
      const objTVSerie = {
        title: title,
        overview: overview,
        poster_path: poster_path,
        popularity: doublePopularity,
        tags: arrTags
      }

      // * MongoDB Parameters
      const query = { _id: ObjectId(tvId) }
      const update = { $set: objTVSerie }
      const options = { returnOriginal: false }

      // * The Method
      const { value } = await tvSeries.findOneAndUpdate(query, update, options)

      // * Send Status
      if (value) {
        res.status(200).json(value)
      } else {
        throw new Error('No document matches the provided id.')
      }
    } catch (err) {
      next(err)
    }
  }

  static async deleteTVSerieById(req, res, next) {
    try {
      const { tvId } = req.params

      // * MongoDB Parameters
      const query = { _id: ObjectId(tvId) }

      // * The Method
      const { deletedCount } = await tvSeries.deleteOne(query)

      // * Send Status
      if (deletedCount !== 0) {
        res.status(200).json('Successfully delete TVSerie')
      } else {
        throw new Error('No document matches the provided id.')
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = TVController
