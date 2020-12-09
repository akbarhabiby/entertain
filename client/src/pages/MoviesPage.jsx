import React from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_MOVIES } from '../graphql/query'
import { Error, Loading, Data } from '../components'

export default function MoviesPage() {
  const router = useHistory()
  const { error, loading, data, refetch } = useQuery(GET_MOVIES())

  if (error) return <Error error={error} />
  if (loading) return <Loading />

  return (
    <div className="content">
      <div className="box_1">
        <h1 className="m_2">Movies</h1>
        <div className="clearfix"></div>
      </div>
      <div className="box_1">
        <button className="btn btn-primary" onClick={() => router.push('/movies/add')}>Add Movie</button>
      </div>
      <div className="box_2">
        {data.movies.map(item => <Data item={item} key={item._id} refetch={refetch} type={item.__typename} />)}
        <div className="clearfix"></div>
      </div>
    </div>
  )
}
