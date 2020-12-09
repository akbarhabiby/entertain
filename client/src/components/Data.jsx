import React from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { stateFavorites } from '../graphql/state'
import {
  DELETE_MOVIE_BY_ID,
  DELETE_TVSERIE_BY_ID
} from '../graphql/mutation'

export default function Data({ item, type, refetch }) {
  const { _id, title, popularity } = item
  const router = useHistory()
  const [deleteMovie] = useMutation(DELETE_MOVIE_BY_ID())
  const [deleteTVSerie] = useMutation(DELETE_TVSERIE_BY_ID())
  
  const target = type === 'Movie' ? 'movies/' + _id : 'tvseries/' + _id

  const handleDetailClick = e => {
    e.preventDefault()
    router.push(target)
  }
  
  const handleAddFavorites = _ => {
    const checkDuplicate = stateFavorites().find(data => data._id === item._id)
    if (!checkDuplicate) {
      stateFavorites([...stateFavorites(), item])
    } else {
      console.log('duplicated!')
    }
  }

  const handleDeleteData = async _ => {
    const checkDataInFavorites = stateFavorites().find(data => data._id === item._id)
    if(checkDataInFavorites) stateFavorites(stateFavorites().filter(data => data._id !== item._id))
    switch(type) {
      case 'Movie':
        await deleteMovie({ variables: { id: _id } })
        break
      case 'TVSerie':
        await deleteTVSerie({ variables: { id: _id } })
        break
      default:
        console.error('No matches')
    }
    refetch()
  }

  return (
    <div className="col-md-3 row_2">
      <div className="col_2">
        <div className="m_5"><a href={target}><img src={item.poster_path} style={{ width: '300px', height: '300px' }} onClick={e => handleDetailClick(e)} className="img-responsive" alt=""/></a></div>
        <ul className="list_4">
          <li>Title : &nbsp;<span className="m_4">{title}</span></li>
          <li>Popularity : &nbsp;<span className="m_4">{popularity}</span></li>
          <li><button className="btn btn-primary m_4" onClick={() => handleAddFavorites()}>Add To Favorites</button> &nbsp; <button className="btn btn-danger m_4" onClick={() => handleDeleteData ()}>Delete</button></li>
          <div className="clearfix"></div>
        </ul>
      </div>
    </div>
  )
}
