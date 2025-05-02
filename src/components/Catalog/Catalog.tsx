import React from 'react'
import Filter from '../Home/Filter'
import './Catalog.scss'
import ListFilms from '../Home/ListFilms'

const Catalog = () => {
  return (
    <div className="catalog">
      <Filter />
      <ListFilms />
    </div>
  )
}

export default Catalog
