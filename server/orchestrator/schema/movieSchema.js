const { gql } = require('apollo-server')

// * require axios
const axios = require('axios').default
const api = axios.create({
  baseURL: 'http://127.0.0.1:3001'
})

// * require redis
const redis = require('../redis')

// * typeDefs
const typeDefs = gql`
  extend type Query {
    movies: [Movie]
    movieId(id: ID): Movie
  }

  extend type Mutation {
    addMovie(data: movieInput): Movie
    editMovie(id: ID!, data: movieInput): Movie
    deleteMovie(id: ID!): String
  }

  input movieInput {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: String!
  }

  type Movie  {
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
    movies: async () => { // * Get All Movies
      // * Check for data movies in cache
      const movies = await redis.get('1337_movies')

      // * If cached data movies found
      if (movies) return JSON.parse(movies)

      const { data: arrMovies } = await api({
        method: 'GET'
      })

      // * Set cached data movies
      await redis.set('1337_movies', JSON.stringify(arrMovies), 'EX', 600)

      // * Return Array of Movies
      return arrMovies
    },
    movieId: async (_, args) => { // * Get Movie by ID
      const { id: movieId } = args

      // * Check for single data movies in cache
      const movie = await redis.get(`1337_movie-${movieId}`)

      // * If cached single data movies found
      if (movie) return JSON.parse(movie)

      const { data: objMovie } = await api({
        method: 'GET',
        url: '/' + movieId
      })

      // * Set cached single data movies
      await redis.set(`1337_movie-${movieId}`, JSON.stringify(movie), 'EX', 600)

      // * Return Object Movie
      return objMovie
    },
  },
  Mutation: {
    addMovie: async (_, args) => { // * Add New Movie
      const { data: objNewMovie } = args
      const { data: newObjMovie } = await api({
        method: 'POST',
        data: objNewMovie
      })

      // * Delete cached movies data in cache & Set cached single data movies
      await redis.del('1337_movies')
      await redis.set(`1337_movie-${newObjMovie.id}`, JSON.stringify(newObjMovie), 'EX', 600)

      // * Return New Object Movie
      return newObjMovie
    },
    editMovie: async (_, args) => { // * Edit Movie By ID
      const { id: movieId, data: objMovie } = args

      const { data: editedObjMovie } = await api({
        method: 'PUT',
        url: '/' + movieId,
        data: objMovie
      })

      // * Delete cached single & Set movies data in cache
      await redis.del('1337_movies')
      await redis.set(`1337_movie-${movieId}`, JSON.stringify(editedObjMovie), 'EX', 600)

      // * Return Edited Object Movie
      return editedObjMovie
    },
    deleteMovie: async (_, args) => { // * Delete Movie by ID
      const { id: movieId } = args
      const { data: status } = await api({
        method: 'DELETE',
        url: '/' + movieId
      })

      // * Delete cached movies & single movies data in cache
      await redis.del(`1337_movie-${movieId}`)
      await redis.del('1337_movies')

      // * Return Status
      return status
    }
  }
}

module.exports = { typeDefs, resolvers }
