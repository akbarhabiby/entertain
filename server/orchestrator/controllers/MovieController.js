// * require axios
const axios = require('axios').default
const api = axios.create({
  baseURL: 'http://127.0.0.1:3001'
})

// * require redis
const redis = require('../redis')

// * Main Controller
class MovieController {
  static async getAllMovies(req, res, next) {
    try {
      // * Check for data movies in cache
      const movies = await redis.get('1337_movies')

      // * If cached data movies found
      if (movies) {
        res.status(200).json(JSON.parse(movies))
      } else {
        const { data } = await api({
          method: 'GET'
        })

        // * Set cached data movies
        await redis.set('1337_movies', JSON.stringify(data), 'EX', 600)
        res.status(200).json(data)
      }
    } catch (err) {
      next(err)
    }
  }

  static async getMovieById(req, res, next) {
    try {
      const { movieId } = req.params

      // * Check for single data movies in cache
      const movie = await redis.get(`1337_movie-${movieId}`)

      // * If cached single data movies found
      if (movie) {
        res.status(200).json(JSON.parse(movie))
      } else {
        const { data } = await api({
          method: 'GET',
          url: '/' + movieId
        })

        // * Set cached single data movies
        await redis.set(`1337_movie-${movieId}`, JSON.stringify(data), 'EX', 600)

        // * Send Status
        res.status(200).json(data)
      }
    } catch (err) {
      next(err)
    }
  }

  static async postAddNewMovie(req, res, next) {
    try {
      const { data } = await api({
        method: 'POST',
        data: req.body
      })

      // * Delete cached movies data in cache
      await redis.del('1337_movies')

      // * Send Status
      res.status(201).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async putEditMovieById(req, res, next) {
    try {
      const { movieId } = req.params
      const { data } = await api({
        method: 'PUT',
        url: '/' + movieId,
        data: req.body
      })

      // * Delete cached single & movies data in cache
      await redis.del(`1337_movies`)
      await redis.del(`1337_movie-${movieId}`)

      // * Send Status
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }
  
  static async deleteMovieById(req, res, next) {
    try {
      const { movieId } = req.params
      const { data } = await api({
        method: 'DELETE',
        url: '/' + movieId
      })

      // * Delete cached single movies data in cache
      await redis.del(`1337_movie-${movieId}`)

      // * Send Status
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = MovieController
