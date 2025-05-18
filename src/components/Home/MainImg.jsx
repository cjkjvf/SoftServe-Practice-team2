import React from 'react'
import './MainImg.scss'
import LocationSVG from '../../assets/location.svg'

const MainImg = () => {
  return (
    <div className="main-img-container">
      <img className="main-img" src="/images/main-img.jpg" />
      <div className="text-container">
        <div className="title">
          <h1>Кінотеатр MULTIPLEX у</h1>
          <h2>ТРЦ "Victoria Gardens"</h2>
        </div>
      </div>
      <div className="location">
        <div className="svg">
          <img src={LocationSVG} alt="Location icon" />
        </div>
        <div className="location-text">
          <p>вул. Кульпарківська, 226 А</p>
          <span>Львів</span>
        </div>
      </div>
    </div>
  )
}

export default MainImg
