import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Autoplay, Navigation } from 'swiper/modules';
import './PromoSlider.css';
import moviesData from '../data/movie.json';

export default function PromoSlider() {
  const [hoveredSlide, setHoveredSlide] = useState(null);
  const [isTrailerVisible, setIsTrailerVisible] = useState(false);
  const swiperRef = useRef(null);
  const timeoutRef = useRef(null);
  const hoverCounts = useRef({});
  const navigate = useNavigate();

  const getEmbedURL = (url) => {
    try {
      const ytID = url.includes('youtu.be')
        ? url.split('/').pop()
        : new URLSearchParams(new URL(url).search).get('v');
      return `https://www.youtube.com/embed/${ytID}?autoplay=1&controls=1`;
    } catch {
      return null;
    }
  };

  const handleMouseEnter = (index) => {
    swiperRef.current?.autoplay?.stop();
    setHoveredSlide(index);


    hoverCounts.current[index] = (hoverCounts.current[index] || 0) + 1;


    const slideElements = document.querySelectorAll('.slide');
    slideElements.forEach((el) => {
      el.classList.remove('hovered', 'delayed-darken');
    });


    const currentSlide = slideElements[index];
    currentSlide.classList.add('hovered');

    if (hoverCounts.current[index] > 1) {
      currentSlide.classList.add('delayed-darken');
    }

    const delay = hoverCounts.current[index] > 1 ? 5000 : 2000;

    timeoutRef.current = setTimeout(() => {
      setIsTrailerVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setHoveredSlide(null);
    setIsTrailerVisible(false);
    swiperRef.current?.autoplay?.start();

    const slideElements = document.querySelectorAll('.slide');
    slideElements.forEach((el) => {
      el.classList.remove('hovered', 'delayed-darken');
    });
  };

  const handleBannerClick = (movieId, index) => {
    if (hoveredSlide === index && isTrailerVisible) return;
    navigate(`/movies/${movieId}`);
  };

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation
      autoplay={{ delay: 4000, disableOnInteraction: false }}
      loop
      speed={1500}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      className="promo-slider"
    >
      {moviesData.map((movie, index) => (
        <SwiperSlide key={movie.id}>
          <div
            className="slide"
            style={{ backgroundImage: `url(${movie.image})` }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleBannerClick(movie.id, index)}
          >
            <div className="slide-overlay">
              <div className="slide-content">
                <div className="left-container">
                  <h1>{movie.title}</h1>
                  <p>{movie.brief_description}</p>
                </div>
                <div className="right-container">
                  <span>{movie.details.year}</span>
                  <span>{movie.details.rating}</span>
                  <span>{movie.genres.join(' ⮕ ')}</span>
                  <span>{movie.details.duration_minutes} хв</span>
                  <span>{movie.details.age_restriction}</span>
                  <span>{movie.details['display-technologies'].join(' ⮕ ')}</span>
                </div>
              </div>
              <button className="action-button">Обрати сеанс</button>
            </div>

            {hoveredSlide === index && isTrailerVisible && (
              <div className="trailer-portal">
                <iframe
                  src={getEmbedURL(movie.trailer)}
                  className="portal-iframe"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  frameBorder="0"
                />
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
