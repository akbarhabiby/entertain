import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Navbar() {
  const router = useHistory()

  const handleChangePage = (e, path) => {
    e.preventDefault()
    router.push(path)
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/" onClick={(e) => handleChangePage(e, '/')}>Entertainme</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/" onClick={(e) => handleChangePage(e, '/')}>Home</a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/" onClick={(e) => handleChangePage(e, '/movies')}>Movies</a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/" onClick={(e) => handleChangePage(e, '/tvseries')}>TVSeries</a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/favorites" onClick={(e) => handleChangePage(e, '/favorites')}>Favorites</a>
          </li>
        </ul>
        {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
      </div>
    </nav>
  )
}
