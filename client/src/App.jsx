import React from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'
import {
  HomePage,
  EditPage,
  DetailPage,
  MoviesPage,
  TVSeriesPage,
  FavoritesPage,
  AddPage
} from './pages'
import {
  Navbar
} from './components'

export default function App() {
  return (
    <div className="container">
      <Navbar />
      <Switch>
        <Route path="/favorites">
          <FavoritesPage />
        </Route>
        <Route path="/tvseries/add">
          <AddPage page={'tvseries'} />
        </Route>
        <Route path="/tvseries/:id/edit">
          <EditPage />
        </Route>
        <Route path="/tvseries/:id">
          <DetailPage />
        </Route>
        <Route path="/tvseries">
          <TVSeriesPage />
        </Route>
        <Route path="/movies/add">
          <AddPage page={'movies'} />
        </Route>
        <Route path="/movies/:id/edit">
          <EditPage />
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
    </div>
  );
}
