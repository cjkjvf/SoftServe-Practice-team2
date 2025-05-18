import React from 'react';
import '../choiceStyles/MovieInfo.css';
import poster from '/src/assets/minecraft0.jpg';
import locationIcon from '/src/assets/location2.svg';
import calendarIcon from '/src/assets/calendar.svg';
import clockIcon from '/src/assets/clock.svg';

const MovieInfo = () => {
  return (
    <div className="movieInfo-container">
      <img src={poster} alt="Minecraft Movie" className="movieInfo-poster" />
      <div className="movieInfo-details">
        <h2 className="movieInfo-title">MINECRAFT: Фільм</h2>

        <div className="movieInfo-tags">
          <span className="movieInfo-tag blue">2D</span>
          <span className="movieInfo-tag light">Драма</span>
        </div>

        <div className="movieInfo-row">
          <div className="movieInfo-card">
            <img src={locationIcon} alt="Локація" />
            <div className="movieInfo-card-label">Зал Зал №1</div>
            <div className="movieInfo-card-value">Львів, ТРЦ “Victoria Gardens”</div>
          </div>
          <div className="movieInfo-card">
            <img src={calendarIcon} alt="Дата" />
            <div className="movieInfo-card-label">29.04.2025</div>
            <div className="movieInfo-card-value">Вівторок</div>
          </div>
          <div className="movieInfo-card">
            <img src={clockIcon} alt="Час" />
            <div className="movieInfo-card-label">Час</div>
            <div className="movieInfo-card-value">11:20 – 13:01</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;









