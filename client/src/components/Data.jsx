import React from 'react'
import { useHistory } from 'react-router-dom'

export default function Data({ item, index }) {
  const { _id, title, popularity, tags, __typename } = item
  const router = useHistory()

  const handleDetailClick = () => {
    const target = __typename === 'Movie' ? 'movies/' : 'tvseries/'
    router.push(target + _id)
  }

  return (
    <tr>
      <th scope="row">{index}</th>
      <td>{title}</td>
      <td>{popularity}</td>
      <td>{tags.join(', ')}</td>
      <td><button onClick={() => handleDetailClick()} className="btn btn-primary">Detail</button></td>
    </tr>
  )
}
