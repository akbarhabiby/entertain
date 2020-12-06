// * Apollo-Server Config
const { ApolloServer, gql, makeExecutableSchema } = require('apollo-server')

// * Import Schema
const { movieSchema, tvSerieSchema } = require('./schema/')

// * TypeDefs
const typeDefs = gql`
  type Query
  type Mutation
`

// * Executable Schema
const schema = makeExecutableSchema({
  typeDefs: [
    typeDefs,
    movieSchema.typeDefs,
    tvSerieSchema.typeDefs
  ],
  resolvers: [
    movieSchema.resolvers,
    tvSerieSchema.resolvers
  ]
})

// * Create ApolloServer
const server = new ApolloServer({ schema })

// * Listen ApolloServer with PORT 3000
server.listen({ port: 3000 }).then(({ url }) => { console.log(`🚀  Server ready at ${url}`) })

// **** ORCHESTRATOR
