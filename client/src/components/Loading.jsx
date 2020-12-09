import React from 'react'

export default function Loading() {
  return (
    <div className="d-flex justify-content-center" style={{ height: 100+'vh'}}>
      <div className="align-self-center">
        <div className="spinner-border text-info" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  )
}
