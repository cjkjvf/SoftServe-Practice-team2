import React from 'react';
import '../choiceStyles/MovieInfo.css';

const MovieInfo = () => {
  return (
    <div className="movieInfo-container">
      <img src="/images/minecraft0.jpg" alt="Minecraft Movie" className="movieInfo-poster" />
      <div className="movieInfo-details">
        <h2 className="movieInfo-title">MINECRAFT: Фільм</h2>

        <div className="movieInfo-tags">
          <span className="movieInfo-tag blue">2D</span>
          <span className="movieInfo-tag light">Драма</span>
        </div>

        <div className="movieInfo-row">
          <div className="movieInfo-card">
            <img src="/images/location2.svg" alt="Локація" />
            <div className="movieInfo-card-label">Зал Зал №1</div>
            <div className="movieInfo-card-value">Львів, ТРЦ “Victoria Gardens”</div>
          </div>
          <div className="movieInfo-card">
            <img src="/images/calendar.svg" alt="Дата" />
            <div className="movieInfo-card-label">29.04.2025</div>
            <div className="movieInfo-card-value">Вівторок</div>
          </div>
          <div className="movieInfo-card">
            <img src="/images/clock.svg" alt="Час" />
            <div className="movieInfo-card-label">Час</div>
            <div className="movieInfo-card-value">11:20 – 13:01</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;







