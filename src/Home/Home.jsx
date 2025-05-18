import React from 'react';
import './Home.scss';
import PromoSlider from './PromoSlider';
import MainImg from './MainImg';
import Catalog from '../Catalog/Catalog';
import Filter from './Filter';
import ListActors from '../ListActors/ListActors';

const Home = () => {
  return (
    <div className="home">
      <PromoSlider />
      <Catalog />
      <ListActors />
    </div>
  );
};

export default Home;
