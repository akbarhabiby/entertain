import { ApolloClient, InMemoryCache } from '@apollo/client'
import { stateFavorites } from './state'

const client = new ApolloClient({
  uri: 'http://127.0.0.1:3000',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          favorites: {
            read() {
              return stateFavorites()
            }
          }
        }
      }
    }
  })
})

export default client
