import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { DataTable, Loading, Error } from '../components'

const GET_MOVIES_AND_TVSERIES = gql`
  query getAllMovies {
    movies {
      _id
      title
      poster_path
      popularity
      tags
    }
    tvseries {
      _id
      title
      poster_path
      popularity
      tags
    }
  }
`

export default function HomePage() {
  const { loading, error, data } = useQuery(GET_MOVIES_AND_TVSERIES)

  if (loading) return <Loading />
  if (error) return <Error error={error} />

  return (
    <div className="container mt-5 text-center">
      <h1>Movies</h1>
      <DataTable data={data.movies} />
      <h1>TV Series</h1>
      <DataTable data={data.tvseries} />
    </div>
  )
}
