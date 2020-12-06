const { gql } = require('apollo-server')

// * require axios
const axios = require('axios').default
const api = axios.create({
  baseURL: 'http://127.0.0.1:3002'
})

// * require redis
const redis = require('../redis')

// * typeDefs
const typeDefs = gql`
  extend type Query {
    tvseries: [TVSerie]
    tvserieId(id: ID): TVSerie
  }
  
  extend type Mutation {
    addTVSerie(data: tvSerieInput): TVSerie
    editTVSerie(id: ID!, data: tvSerieInput): TVSerie
    deleteTVSerie(id: ID!): String
  }

  input tvSerieInput {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: String!
  }

  type TVSerie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }
`

// * resolvers
const resolvers = {
  Query: {
    tvseries: async () => { // * Get All TV Series
      // * Check for data tvseries in cache
      const tvSeries = await redis.get('1337_tvseries')

      // * If cached data tvseries found
      if (tvSeries) return JSON.parse(tvSeries)

      const { data: arrTvSeries } = await api({
        method: 'GET',
      })

      // * Set cached data tvseries
      await redis.set('1337_tvseries', JSON.stringify(arrTvSeries), 'EX', 600)

      // * Return Array of TV Series
      return arrTvSeries
    },
    tvserieId: async (_, args) => { // * Get TV Serie by ID
      const { id: tvId } = args

      // * Check for single data tvseries in cache
      const tvSeries = await redis.get(`1337_tv-series-${tvId}`)

      // * If cached single data tvseries found
      if (tvSeries) return JSON.parse(tvSeries)

      const { data: objTvserie } = await api({
        method: 'GET',
        url: '/' + tvId
      })

      // * Set cached single data tvseries
      await redis.set(`1337_tv-series-${tvId}`, JSON.stringify(objTvserie), 'EX', 600)

      // * Return Object TV Serie
      return objTvserie
    }
  },
  Mutation: {
    addTVSerie: async (_, args) => {
      const { data: objNewTVSerie } = args
      const { data: newObjTVSerie } = await api({
        method: 'POST',
        data: objNewTVSerie
      })

      // * Delete cached tvseries data in cache & Set cached single data tvseries
      await redis.del('1337_tvseries')
      await redis.set(`1337_tv-series-${newObjTVSerie.id}`, JSON.stringify(newObjTVSerie), 'EX', 600)

      // * Return New Object TV Serie
      return newObjTVSerie
    },
    editTVSerie: async (_, args) => {
      const { id: tvId, data: objTVSerie } = args

      const { data: editedObjTVSerie } = await api({
        method: 'PUT',
        url: '/' + tvId,
        data: objTVSerie
      })

      // * Delete cached single & Set tvseries data in cache
      await redis.del('1337_tvseries')
      await redis.set(`1337_tv-series-${tvId}`, JSON.stringify(editedObjTVSerie), 'EX', 600)

      // * Return Edited Object TV Serie
      return editedObjTVSerie
    },
    deleteTVSerie: async (_, args) => {
      const { id: tvId } = args
      const { data: status } = await api({
        method: 'DELETE',
        url: '/' + tvId
      })

      // * Delete cached tvseries & single tvseries data in cache
      await redis.del(`1337_tv-series-${tvId}`)
      await redis.del('1337_tvseries')

      // * Return Status
      return status
    }
  }
}

module.exports = { typeDefs, resolvers }
