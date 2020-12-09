import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Navbar() {
  const router = useHistory()

  const handleChangePage = (e, path) => {
    e.preventDefault()
    router.push(path)
  }

  return (
    <div className="header_top">
      <div className="col-sm-3 logo"><a href="/" style={{ color: 'inherit' }} onClick={(e) => handleChangePage(e, '/')}><img src="images/logo.png" alt=""/>Home</a></div>
      <div className="col-sm-6 nav">
        <ul>
          <li><h4><a href="/movies" style={{ color: 'inherit', marginRight: '20px' }} onClick={(e) => handleChangePage(e, '/movies')}>Movies</a></h4></li>
          <li><h4><a href="/tvseries" style={{ color: 'inherit', marginRight: '20px' }} onClick={(e) => handleChangePage(e, '/tvseries')}>TVSeries</a></h4></li>
          <li><h4><a href="/favorites" style={{ color: 'inherit', marginRight: '20px' }} onClick={(e) => handleChangePage(e, '/favorites')}>Favorites</a></h4></li>
        </ul>
      </div>
      <div className="clearfix"></div>
    </div>
  )
}
