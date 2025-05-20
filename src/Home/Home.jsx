import React from 'react';
import './Home.scss';
import PromoSlider from './PromoSlider';
import Info from '../Home/Info';
import ListActors from '../ListActors/ListActors';
import ListFilms from './ListFilms';
import { Link } from 'react-router-dom'
import Filter from '../Home/Filter'

const Home = () => {
  return (
    <div className="home">
      <PromoSlider />
      {/* <Filter /> */}
      <Info>
        Перейти до каталогу <Link to="/catalog"> каталогу фільмів</Link>
      </Info>
      <ListFilms />
      <ListActors />
    </div>
  );
};

export default Home;
