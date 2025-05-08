import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Autoplay, Navigation } from 'swiper/modules';
import './PromoSlider.css';

export default function PromoSlider() {
  // Стейт для збереження фільмів
  const [movies, setMovies] = useState([]);

  // Завантаження даних з JSON файлу
  useEffect(() => {
    fetch('src/date/movies.json')  // Шлях до JSON файлу
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error loading JSON data: ', error));
  }, []);

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      autoplay={{
        delay: 4100,
        disableOnInteraction: false,
      }}
      loop={true}
      speed={1500}
      initialSlide={0}
      className="promo-slider"
    >
      {movies.map((movie, index) => (
        <SwiperSlide key={movie.id}>
          <div
            className="slide"
            style={{ backgroundImage: `url(${movie.image})` }} // Встановлення фону слайду
          >
            <div className="slide-overlay">
              <div className="slide-info">
                <h1>{movie.title}</h1>
                <p>{movie.description}</p>
                <div className="movie-details">
                  <span>{movie.rating}</span>
                  <span>{movie.year}</span>
                  <span>{movie.genre}</span>
                </div>
              </div>
              <button className="action-button">Обрати сеанс</button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}


