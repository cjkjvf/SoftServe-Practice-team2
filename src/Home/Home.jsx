import React from 'react';
import './Home.scss'; // Використовуємо один стильовий файл, бажано SCSS
import PromoSlider from './PromoSlider';
import MainImg from './MainImg';
import Filter from './Filter';
import Info from './Info';
import ListFilms from './ListFilms';

const Home = () => {
  return (
    <div className="home">
      <PromoSlider />

      <MainImg />
      <Filter />

      <Info>
        <div>Натисніть на час сеансу, щоб обрати місця</div>
      </Info>

      <ListFilms />
    </div>
  );
};

export default Home;
