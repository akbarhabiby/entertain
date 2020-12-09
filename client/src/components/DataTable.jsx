import React from 'react'
import { Data } from './'

export default function DataTable({ data, refetch }) {
  const { __typename } = data[0]
  return (
    <div className="content">
      <div className="box_1">
        <h1 className="m_2">{ __typename === 'Movie' ? 'Featured Movies' : 'Featured TV Series' }</h1>
        <div className="clearfix"></div>
      </div>
      <div className="box_2">
        {data.map((item, i) => <Data item={item} key={item._id} index={i} type={__typename} refetch={refetch} />)}
        <div className="clearfix"></div>
      </div>
    </div>
  )
}
