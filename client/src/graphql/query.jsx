import { gql } from '@apollo/client'

export const GET_MOVIES_AND_TVSERIES = _ => {
  return gql`
    query entertainme {
      movies {
        _id
        title
        poster_path
        overview
        popularity
        tags
      }
      tvseries {
        _id
        title
        poster_path
        overview
        popularity
        tags
      }
    }
  `
}

export const GET_MOVIES = _ => {
  return gql`
    query getAllMovies {
      movies {
        _id
        title
        overview
        poster_path
        popularity
        tags
      }
    }
  `
}

export const GET_TVSERIES = _ => {
  return gql `
    query getAllTVSeries {
      tvseries {
        _id
        title
        overview
        poster_path
        popularity
        tags
      }
    }
  `
}

export const GET_MOVIE_BY_ID = id => { 
  return gql`
    query getMovieById {
      movieId(id: "${id}") {
        title
        poster_path
        overview
        popularity
        tags
      }
    }
  `
}

export const GET_TVSERIE_BY_ID = id => {
  return gql`
    query getTVSerieById {
      tvserieId(id: "${id}") {
        title
        poster_path
        overview
        popularity
        tags
      }
    }
  ` 
}

export const GET_FAVORITES = _ => {
  return gql`
    query favorites {
      favorites @client
    }
  `
}
