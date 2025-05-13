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
  const [isLoaded, setIsLoaded] = useState(false); // Стейт для перевірки, чи завантажились дані

  // Завантаження даних з JSON файлу
  useEffect(() => {
    fetch('src/date/movies.json')  // Шлях до JSON файлу
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setIsLoaded(true);  // Дані завантажені
      })
      .catch((error) => console.error('Error loading JSON data: ', error));
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

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
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <div
            className="slide"
            style={{ backgroundImage: `url(${movie.image})` }} // Встановлення фону слайду
          >
            <div className="slide-overlay">
              <div className="slide-content">
                {/* Лівий контейнер для title та description */}
                <div className="left-container">
                  <h1>{movie.title}</h1>
                  <p>{movie.description}</p>
                </div>
                {/* Правий контейнер для details */}
                <div className="right-container">
                    <span>{movie.year}</span>
                    <span>{movie.rating}</span>
                    <span>{movie.genre}</span>
                    <span>{movie.duration}</span>
                    <span>{movie['Age-restrictions']}</span>
                    <span>{movie['display-technologies']}</span>
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