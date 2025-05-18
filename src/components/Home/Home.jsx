import React from 'react'
import MainImg from './MainImg'
import './Home.scss'
import Filter from './Filter'
import ListFilms from './ListFilms'
import Info from './Info'

const Home = () => {
  return (
    <div className="home">
      <MainImg />
      <Filter />
      <Info>
        <div>Натисніть на час сеансу, щоб обрати місця</div>
      </Info>
      <ListFilms />
    </div>
  )
}

export default Home
