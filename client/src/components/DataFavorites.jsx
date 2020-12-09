import React from 'react'
import { useHistory } from 'react-router-dom'
import { stateFavorites } from '../graphql/state'

export default function DataFavorites({ item, type }) {
  const { _id, title, popularity } = item
  const router = useHistory()
  
  const target = type === 'Movie' ? 'movies/' + _id : 'tvseries/' + _id

  const handleDetailClick = e => {
    e.preventDefault()
    router.push(target)
  }
  
  const handleDeleteFavori = _ => {
    const newArrAfterDelete = stateFavorites().filter(data => data._id !== item._id)
    stateFavorites(newArrAfterDelete)
  }

  return (
    <div className="col-md-3 row_2">
      <div className="col_2">
        <div className="m_5"><a href={target}><img src={item.poster_path} style={{ width: '300px', height: '300px' }} onClick={e => handleDetailClick(e)} className="img-responsive" alt=""/></a></div>
        <ul className="list_4">
          <li>Title : &nbsp;<span className="m_4">{title}</span></li>
          <li>Popularity : &nbsp;<span className="m_4">{popularity}</span></li>
          <li><button className="btn btn-danger m_4" onClick={() => handleDeleteFavori()}>Delete From Favorites</button></li>
          <div className="clearfix"></div>
        </ul>
      </div>
    </div>
  )
}
