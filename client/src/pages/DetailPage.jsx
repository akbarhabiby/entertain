import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { useParams, useLocation } from 'react-router-dom'
import { Loading, Error } from '../components'

export default function DetailPage() {
  const { id } = useParams()

  const GET_MOVIE_BY_ID = gql`
    query getMovieById {
      movieId(id: "${id}") {
        title
        overview
      }
    }
  `

  const GET_TVSERIE_BY_ID = gql`
    query getTVSerieById {
      tvserieId(id: "${id}") {
        title
        overview
      }
    }
  `

  const { pathname } = useLocation()
  console.log(pathname.split('/')[1] === 'movies');
  const GET_DATA = pathname.split('/')[1] === 'movies' ? GET_MOVIE_BY_ID : GET_TVSERIE_BY_ID
  const { error, loading, data } = useQuery(GET_DATA)

  if (loading) return <Loading />
  if (error) return <Error error={error} />

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  )
}
