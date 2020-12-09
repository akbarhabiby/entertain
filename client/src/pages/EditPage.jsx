import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { useParams, useLocation, useHistory } from 'react-router-dom'
import { Loading, Error } from '../components'
import { GET_MOVIE_BY_ID, GET_TVSERIE_BY_ID } from '../graphql/query'
import { EDIT_MOVIE_BY_ID, EDIT_TVSERIE_BY_ID } from '../graphql/mutation'

export default function EditPage() {
  const [profile, setProfile] = useState({})
  const { id } = useParams()

  const { pathname } = useLocation()
  const router = useHistory()

  const GET_DATA = pathname.split('/')[1] === 'movies' ? GET_MOVIE_BY_ID(id) : GET_TVSERIE_BY_ID(id)
  const { error, loading, data, refetch } = useQuery(GET_DATA)
  const EDIT_DATA = pathname.split('/')[1] === 'movies' ? EDIT_MOVIE_BY_ID() : EDIT_TVSERIE_BY_ID()
  const [editData] = useMutation(EDIT_DATA)

  useEffect(() => {
    if (data) {
      if (data.movieId) setProfile({ ...data.movieId, popularity: data.movieId.popularity.toString(), tags: data.movieId.tags.join(',') })
      if (data.tvserieId) setProfile({ ...data.tvserieId, popularity: data.tvserieId.popularity.toString(), tags: data.tvserieId.tags.join(',') })
    }
  }, [data])
  

  if (loading) return <Loading />
  if (error) return <Error error={error} />
  const handleSubmitForm = async e => {
    e.preventDefault()

    if(!profile.popularity.split('.')[1]) {
      let newPopularity = profile.popularity + '.0'
      setProfile({ ...profile, popularity: newPopularity }) 
    }

    await editData({ variables: { ...profile, popularity: parseFloat(profile.popularity), id: id } })
    refetch()
    router.push('/' + pathname.split('/')[1] + '/' + id)
  }

  return (
    <div className="content">
      <div className="register">
        <form> 
          <div className="register-top-grid">
            <h3>Edit Page</h3>
            <div>
              <strong>Title<label>*</label></strong>
              <input type="text" placeholder="e.g: Avengers: End Game" defaultValue={profile.title} onChange={e => setProfile({ ...profile, title: e.target.value })} /> 
            </div>
            <div>
              <strong>Overview<label>*</label></strong>
              <input type="text" placeholder="e.g: Avengers: Endgame is a 2019 American superhero film...." defaultValue={profile.overview} onChange={e => setProfile({ ...profile, overview: e.target.value })} /> 
            </div>
            <div>
              <strong>Poster Path<label>*</label></strong>
              <input type="text" placeholder="e.g: http://yourwebsite.com/img/poster.jpg" defaultValue={profile.poster_path} onChange={e => setProfile({ ...profile, poster_path: e.target.value })} /> 
            </div>
            <div>
              <strong>Popularity<label>*</label></strong>
              <input type="number" placeholder="e.g: 8,8" defaultValue={profile.popularity} onChange={e => setProfile({ ...profile, popularity: e.target.value })} /> 
              <span>Popularity should be a double / float (x,x) not (x)</span>
            </div>
            <div>
              <strong>Tags<label>*</label></strong>
              <input type="text" placeholder="e.g: Cool, Amazing, Horror, Colorful" defaultValue={profile.tags} onChange={e => setProfile({ ...profile, tags: e.target.value })} />
              <span>Tags should separated with commas</span>
            </div>
            <div className="clearfix"> </div>
          </div>
        </form>
        <div className="clearfix"> </div>
        <div className="register-but">
          <form onSubmit={e => handleSubmitForm(e)}>
            <input type="submit" value="Edit" />
            <div className="clearfix"> </div>
          </form>
        </div>
      </div>
    </div>
  )
}
