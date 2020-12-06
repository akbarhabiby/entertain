import React from 'react'
import { Data } from './'

export default function DataTable({ data }) {
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">No</th>
          <th scope="col">Title</th>
          <th scope="col">Popularity</th>
          <th scope="col">Tags</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => <Data key={item._id} item={item} index={i + 1} />)}
      </tbody>
    </table>
  )
}
