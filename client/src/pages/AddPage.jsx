import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ADD_MOVIE, ADD_TVSERIE } from '../graphql/mutation'
import { GET_MOVIES_AND_TVSERIES } from '../graphql/query'
import { useHistory } from 'react-router-dom'

export default function AddPage({ page }) {
  const [profile, setProfile] = useState({ title: '', overview: '', poster_path: '', popularity: '', tags: '' })
  const ADD_DATA = page === 'movies' ? ADD_MOVIE() : ADD_TVSERIE()
  const [addData] = useMutation(ADD_DATA)
  const { refetch } = useQuery(GET_MOVIES_AND_TVSERIES())
  const router = useHistory()

  const handleSubmitForm = async e => {
    e.preventDefault()

    if(!profile.popularity.split('.')[1]) {
      let newPopularity = profile.popularity + '.0'
      setProfile({ ...profile, popularity: newPopularity }) 
    }

    await addData({ variables: { ...profile, popularity: parseFloat(profile.popularity) } })
    refetch()
    router.push('/' + page)
  }

  return (
    <div className="content">
      <div className="register">
        <form> 
          <div className="register-top-grid">
            <h3>Add Page</h3>
            <div>
              <strong>Title<label>*</label></strong>
              <input type="text" placeholder="e.g: Avengers: End Game" value={profile.title} onChange={e => setProfile({ ...profile, title: e.target.value })} /> 
            </div>
            <div>
              <strong>Overview<label>*</label></strong>
              <input type="text" placeholder="e.g: Avengers: Endgame is a 2019 American superhero film...." value={profile.overview} onChange={e => setProfile({ ...profile, overview: e.target.value })} /> 
            </div>
            <div>
              <strong>Poster Path<label>*</label></strong>
              <input type="text" placeholder="e.g: http://yourwebsite.com/img/poster.jpg" value={profile.poster_path} onChange={e => setProfile({ ...profile, poster_path: e.target.value })} /> 
            </div>
            <div>
              <strong>Popularity<label>*</label></strong>
              <input type="number" placeholder="e.g: 7.85" value={profile.popularity} onChange={e => setProfile({ ...profile, popularity: e.target.value })} /> 
            </div>
            <div>
              <strong>Tags<label>*</label></strong>
              <input type="text" placeholder="e.g: Cool, Amazing, Horror, Colorful" value={profile.tags} onChange={e => setProfile({ ...profile, tags: e.target.value })} />
              <span>Tags should separated with commas</span>
            </div>
            <div className="clearfix"> </div>
          </div>
        </form>
        <div className="clearfix"> </div>
        <div className="register-but">
          <form onSubmit={e => handleSubmitForm(e)}>
            <input type="submit" value="Add" />
            <div className="clearfix"> </div>
          </form>
        </div>
      </div>
    </div>
  )
}
