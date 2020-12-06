// * Apollo-Server Config
const { ApolloServer, gql } = require('apollo-server')
const axios = require('axios').default

const typeDefs = gql`
  type Query {
    movies: [Movie]
    tvseries: [TVSerie]
    movieId(id: ID): Movie
    tvserieId(id: ID): TVSerie
  }

  type Mutation {
    addMovie(data: movieInput): Movie
    addTVSerie(data: tvSerieInput): TVSerie
    deleteMovie(id: ID!): String
    deleteTVSerie(id: ID!): String
  }

  input movieInput {
    title: String!
    overview: String!
    poster_path: String!
    popularity: Float!
    tags: String!
  }

  input tvSerieInput {
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

  type TVSerie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Float
    tags: [String]
  }
`

const resolvers = {
  Query: {
    movies: async () => { // * Get All Movies
      const { data: arrMovies } = await axios({
        method: 'GET',
        url: 'http://127.0.0.1:3001'
      })
      return arrMovies
    },
    tvseries: async () => { // * Get All TV Series
      const { data: arrTvSeries } = await axios({
        method: 'GET',
        url: 'http://127.0.0.1:3002'
      })
      return arrTvSeries
    },
    movieId: async (_, args) => { // * Get Movie by ID
      const { id } = args
      const { data: objMovie } = await axios({
        method: 'GET',
        url: 'http://127.0.0.1:3001/' + id
      })
      return objMovie
    },
    tvserieId: async (_, args) => { // * Get TV Serie by ID
      const { id } = args
      const { data: objTvserie } = await axios({
        method: 'GET',
        url: 'http://127.0.0.1:3002/' + id
      })
      return objTvserie
    }
  },
  Mutation: {
    addMovie: async (_, args) => {
      const { data: objNewMovie } = args
      const { data: newObjMovie } = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:3001',
        data: objNewMovie
      })
      return newObjMovie
    },
    addTVSerie: async (_, args) => {
      const { data: objNewTVSerie } = args
      const { data: newObjTVSerie } = await axios({
        method: 'POST',
        url: 'http://127.0.01:3002',
        data: objNewTVSerie
      })
      return newObjTVSerie
    },
    deleteMovie: async (_, args) => {
      const { id } = args
      const { data: status } = await axios({
        method: 'DELETE',
        url: 'http://127.0.0.1:3001/' + id
      })
      return status
    },
    deleteTVSerie: async (_, args) => {
      const { id } = args
      const { data: status } = await axios({
        method: 'DELETE',
        url: 'http://127.0.0.1:3002/' + id
      })
      return status
    }
  }
}

// * Create ApolloServer
const server = new ApolloServer({ typeDefs, resolvers })

// * Listen ApolloServer with PORT 3000
server.listen({ port: 3000 }).then(({ url }) => { console.log(`🚀  Server ready at ${url}`) })

// **** ORCHESTRATOR
