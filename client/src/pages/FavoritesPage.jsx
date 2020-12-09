import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_FAVORITES } from '../graphql/query'
import { DataFavorites }  from '../components/'

export default function FavoritesPage() {
  const { data: { favorites } } = useQuery(GET_FAVORITES())

  return (
    <div className="content">
      <div className="box_1">
        <h1 className="m_2">My Favorites</h1>
        <div className="clearfix"></div>
      </div>
      <div className="box_2">
        {favorites.map(item => <DataFavorites item={item} key={item._id} />)}
        <div className="clearfix"></div>
      </div>
    </div>
  )
}
