import { gql } from '@apollo/client'

export const ADD_MOVIE = _ => {
  return gql`
    mutation inputMovie($title: String!, $overview: String!, $poster_path: String!, $popularity: Float!, $tags: String!) {
      addMovie(data: {
        title: $title
        overview: $overview
        poster_path: $poster_path
        popularity: $popularity
        tags: $tags
      }) {
        _id
      }
    }
  `
}

export const ADD_TVSERIE = _ => {
  return gql`
    mutation inputTVSerie($title: String!, $overview: String!, $poster_path: String!, $popularity: Float!, $tags: String!) {
      addTVSerie(data: {
        title: $title
        overview: $overview
        poster_path: $poster_path
        popularity: $popularity
        tags: $tags
      }) {
        _id
      }
    }
  `
}

export const EDIT_MOVIE_BY_ID = _ => {
  return gql`
    mutation editMovie($id: ID!, $title: String!, $overview: String!, $poster_path: String!, $popularity: Float!, $tags: String!) {
      editMovie(id: $id, data: {
        title: $title
        overview: $overview
        poster_path: $poster_path
        popularity: $popularity
        tags: $tags
      }) {
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

export const EDIT_TVSERIE_BY_ID = _ => {
  return gql`
    mutation editTVSerie($id: ID!, $title: String!, $overview: String!, $poster_path: String!, $popularity: Float!, $tags: String!) {
      editTVSerie(id: $id, data: {
        title: $title
        overview: $overview
        poster_path: $poster_path
        popularity: $popularity
        tags: $tags
      }) {
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

export const DELETE_MOVIE_BY_ID = _ => {
  return gql`
    mutation deleteMovie($id: ID!) {
      deleteMovie(id: $id)
    }
  `
}

export const DELETE_TVSERIE_BY_ID = _ => {
  return gql`
    mutation deleteTVSerie($id: ID!) {
      deleteTVSerie(id: $id)
    }
  `
}
