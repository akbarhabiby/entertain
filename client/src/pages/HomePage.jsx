import React from 'react'
import { useQuery } from '@apollo/client'
import { DataTable, Loading, Error } from '../components'
import { GET_MOVIES_AND_TVSERIES } from '../graphql/query'

export default function HomePage() {
  const { loading, error, data, refetch } = useQuery(GET_MOVIES_AND_TVSERIES())

  if (loading) return <Loading />
  if (error) return <Error error={error} />

  return (
    <>
      {/* <!-- Movies --> */}
			<DataTable data={data.movies} refetch={refetch} />
			{/* <!-- TV Series --> */}
      <DataTable data={data.tvseries} refetch={refetch} />
    </>
  )
}
