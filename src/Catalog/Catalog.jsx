import React from 'react'
import Filter from '../Home/Filter'
import './Catalog.scss'
import ListFilms from '../Home/ListFilms'
import MainImg from '../Home/MainImg'
import Info from '../Home/Info'
import { Link } from 'react-router-dom'

const Catalog = () => {
  return (
    <div className="catalog">
      <MainImg/>
      {/* <Filter /> */}

      <ListFilms />
    </div>
  )
}

export default Catalog