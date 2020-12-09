import React from 'react'
import { useQuery } from '@apollo/client'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import { Loading, Error } from '../components'
import { GET_MOVIE_BY_ID, GET_TVSERIE_BY_ID } from '../graphql/query'

export default function DetailPage() {
  const { id } = useParams()

  const { pathname } = useLocation()
  const router = useHistory()

  const GET_DATA = pathname.split('/')[1] === 'movies' ? GET_MOVIE_BY_ID(id) : GET_TVSERIE_BY_ID(id)
  const { error, loading, data } = useQuery(GET_DATA)

  const handleEditClick = e => {
    e.preventDefault()
    router.push(pathname + '/edit')
  }

  if (loading) return <Loading />
  if (error) return <Error error={error} />

  return (
    <div className="content">
      <div className="movie_top">
        <div className="col-md-9 movie_box">
          <div className="grid images_3_of_2">
            <div className="movie_image">
              <img src={data.movieId ? data.movieId.poster_path : data.tvserieId.poster_path } className="img-responsive" alt=""/>
            </div>
          </div>
          <div className="desc1 span_3_of_2">
            <p className="movie_option"><strong>Title: </strong>{ data.movieId ? data.movieId.title : data.tvserieId.title }</p>
            <p className="movie_option"><strong>Popularity: </strong>{ data.movieId ? data.movieId.popularity : data.tvserieId.popularity }</p>
            <p className="movie_option"><strong>Overview: </strong>{ data.movieId ? data.movieId.overview : data.tvserieId.overview }</p>
            <p className="movie_option"><strong>Tags: </strong>{ data.movieId ? data.movieId.tags : data.tvserieId.tags }</p>
            <div className="down_btn"><a className="btn1" href={pathname + '/edit'} onClick={e => handleEditClick(e)}>Edit</a></div>
          </div>
        </div>
        <div className="clearfix"></div>
      </div>
    </div>
  )
}
