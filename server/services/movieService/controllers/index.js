const { db, ObjectId, Double } = require('../db/config')
const movies = db.collection('movies')

class MovieController {
  static async getAllMovies(req, res, next) {
    try {
      // * The Method
      const arrMovies = await movies.find().toArray()

      // * Send Status
      res.status(200).json(arrMovies)
    } catch (err) {
      next(err)
    }
  }

  static async getMovieById(req, res, next) {
    try {
      const { movieId } = req.params
      
      // * MongoDB Parameters
      const query = { _id: ObjectId(movieId) }

      // * The Method
      const movie = await movies.findOne(query)

      // * Send Status
      res.status(200).json(movie)
    } catch (err) {
      next(err)
    }
  }

  static async postAddNewMovie(req, res, next) {
    try {
      const { title, overview, poster_path, popularity, tags } = req.body
      const doublePopularity = Double(popularity)
      const arrTags = tags.split(', ')

      // * New Item
      const objMovie = {
        title: title,
        overview: overview,
        poster_path: poster_path,
        popularity: doublePopularity,
        tags: arrTags
      }

      // * The Method
      const { ops } = await movies.insertOne(objMovie)

      // * Send Status
      res.status(201).json(ops[0])
    } catch (err) {
      next(err)
    }
  }

  static async putEditMovieById(req, res, next) {
    try {
      const { movieId } = req.params
      const { title, overview, poster_path, popularity, tags } = req.body
      const doublePopularity = Double(popularity)
      const arrTags = tags.split(', ')

      // * New Item Value
      const objMovie = {
        title: title,
        overview: overview,
        poster_path: poster_path,
        popularity: doublePopularity,
        tags: arrTags
      }

      // * MongoDB Parameters
      const query = { _id: ObjectId(movieId) }
      const update = { $set: objMovie }
      const options = { returnOriginal: false }

      // * The Method
      const { value } = await movies.findOneAndUpdate(query, update, options)

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

  static async deleteMovieById(req, res, next) {
    try {
      const { movieId } = req.params

      // * MongoDB Parameters
      const query = { _id: ObjectId(movieId) }

      // * The Method
      const { deletedCount } = await movies.deleteOne(query)

      // * Send Status
      if (deletedCount !== 0) {
        res.status(200).json('Successfully delete Movie')
      } else {
        throw new Error('No document matches the provided id.')
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = MovieController
