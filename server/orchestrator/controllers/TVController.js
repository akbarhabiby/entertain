// * require axios
const axios = require('axios').default
const api = axios.create({
  baseURL: 'http://127.0.0.1:3002'
})

// * require redis
const redis = require('../redis')

// * Main Controller
class TVController {
  static async getAllTVSeries(req, res, next) {
    try {
      // * Check for data tvseries in cache
      const tvSeries = await redis.get('1337_tvseries')

      // * If cached data tvseries found
      if (tvSeries) {
        res.status(200).json(JSON.parse(tvSeries))
      } else {
        const { data } = await api({
          method: 'GET'
        })

        // * Set cached data tvseries
        await redis.set('1337_tvseries', JSON.stringify(data), 'EX', 600)
        res.status(200).json(data)
      }
    } catch (err) {
      next(err)
    }
  }

  static async getTVSerieById(req, res, next) {
    try {
      const { tvId } = req.params

      // * Check for single data tvseries in cache
      const tvSerie = await redis.get(`1337_tv-series-${tvId}`)

      // * If cached single data tvseries found
      if (tvSerie) {
        res.status(200).json(JSON.parse(tvSerie))
      } else {
        const { data } = await api({
          method: 'GET',
          url: '/' + tvId
        })

        // * Set cached single data tvseries
        await redis.set(`1337_tv-series-${tvId}`, JSON.stringify(data), 'EX', 600)

        // * Send Status
        res.status(200).json(data)
      }
    } catch (err) {
      next(err)
    }
  }

  static async postAddNewTVSerie(req, res, next) {
    try {
      const { data } = await api({
        method: 'POST',
        data: req.body
      })

      // * Delete cached tvseries data in cache
      await redis.del('1337_tvseries')

      // * Send Status
      res.status(201).json(data)
    } catch (err) {
      next(err)
    }
  }

  static async putEditTVSerieById(req, res, next) {
    try {
      const { tvId } = req.params
      const { data } = await api({
        method: 'PUT',
        url: '/' + tvId,
        data: req.body
      })

      // * Delete cached single & tvseries data in cache
      await redis.del(`1337_tvseries`)
      await redis.set(`1337_tv-series-${tvId}`, JSON.stringify(data), 'EX', 600)

      // * Send Status
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }
  
  static async deleteTVSerieById(req, res, next) {
    try {
      const { tvId } = req.params
      const { data } = await api({
        method: 'DELETE',
        url: '/' + tvId
      })

      // * Delete cached single tvseries data in cache
      await redis.del(`1337_tv-series-${tvId}`)

      // * Send Status
      res.status(200).json(data)
    } catch (err) {
      next(err)
    }
  }
}

module.exports = TVController
