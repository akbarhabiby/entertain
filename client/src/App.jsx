import React from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'
import {
  HomePage,
  DetailPage,
  MoviesPage,
  TVSeriesPage,
  FavoritesPage
} from './pages'
import {
  Navbar
} from './components'

export default function App() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route path="/favorites">
          <FavoritesPage />
        </Route>
        <Route path="/tvseries/:id">
          <DetailPage />
        </Route>
        <Route path="/tvseries">
          <TVSeriesPage />
        </Route>
        <Route path="/movies/:id">
          <DetailPage />
        </Route>
        <Route path="/movies">
          <MoviesPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </>
  );
}
