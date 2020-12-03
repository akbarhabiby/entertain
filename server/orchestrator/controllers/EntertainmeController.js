// * require axios
const axios = require('axios').default

// * URLs
const movieServiceURL = 'http://127.0.0.1:3001'
const tvServiceURL = 'http://127.0.0.1:3002'

// * require redis
const redis = require('../redis')

// * Main Controller
class EntertainmeController {
  static async getMovieAndTVSeries(req, res, next) {
    try {
      // * Check for data movies && tvseries in cache
      const _movies = await redis.get('1337_movies')
      const _tvSeries = await redis.get('1337_tvseries')

      // * If cached data movies found
      if (_movies && _tvSeries) {
        res.status(200).json({ movies: JSON.parse(_movies), tvSeries: JSON.parse(_tvSeries) })
      } else {
        const { data: movies } = await axios({
          method: 'GET',
          url: movieServiceURL
        })
  
        const { data: tvSeries } = await axios({
          method: 'GET',
          url: tvServiceURL
        })

        await redis.set('1337_movies', JSON.stringify(movies), 'EX', 600)
        await redis.set('1337_tvseries', JSON.stringify(tvSeries), 'EX', 600)

        res.status(200).json({ movies: movies, tvSeries: tvSeries })
      }
    } catch (err) {
      next(err)
    }
  }
}

module.exports = EntertainmeController
