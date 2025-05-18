import React from 'react'
import Filter from '../Home/Filter'
import './Catalog.scss'
import ListFilms from '../Home/ListFilms'
import Info from '../Home/Info'
import { Link } from 'react-router-dom'

const Catalog = () => {
  return (
    <div className="catalog">
      <Filter />
      <Info>
        Перейти до каталогу <Link to="/catalog"> каталогу фільмів</Link>
      </Info>
      <ListFilms />
    </div>
  )
}

export default Catalog
