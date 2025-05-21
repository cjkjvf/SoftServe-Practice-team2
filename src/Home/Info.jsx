import React from 'react'
import './Info.scss'

const Info = ({ children }) => {
  return (
    <div className="info-container">
      <div className="line" />
      <p>{children}</p>
    </div>
  )
}

export default Info